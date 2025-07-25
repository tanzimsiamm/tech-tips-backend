import httpStatus from "http-status";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import config from "../../config";

// Handles both password and social auth registration
const createUserIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });

  // Password-based registration flow
  if (payload?.password) {
    if (user) {
      throw new AppError(httpStatus.FORBIDDEN, "already exist");
    }

    const userData = await User.create(payload);
    if (userData?.password) userData.password = ""; // Remove password before returning
    return userData;
  }

  // Social auth flow
  else {
    if (user) {
      // Return existing user with token
      const jwtPayload = {
        email: user.email,
        role: user.role,
        _id: user._id,
        memberShip: user?.memberShip,
      };
      const token = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        { expiresIn: config.jwt_access_expires } as jwt.SignOptions
      );

      return { user, token };
    } else {
      // Create new user with token
      const userData = await User.create(payload);
      const jwtPayload = {
        email: userData.email,
        role: userData.role,
        _id: userData._id,
        memberShip: userData?.memberShip,
      };
      const token = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        { expiresIn: config.jwt_access_expires } as jwt.SignOptions
      );

      return { userData, token };
    }
  }
};

// Handles user authentication
const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "user not exist");
  }

  // Validate password if account has one
  if (user?.password) {
    if (user.password !== payload.password) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Password incorrect");
    }
  }

  // Generate JWT token
  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id,
    memberShip: user?.memberShip,
  };
  const token = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    { expiresIn: config.jwt_access_expires } as jwt.SignOptions
  );

  user.password = ""; // Never return password hash
  return { user, token };
};

export const authServices = {
  createUserIntoDB,
  loginUser,
};
