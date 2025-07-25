import { TUser } from "./user.interface";
import { User } from "./user.model";

// User Service Methods

/**
 * Fetches all users with optional role-based filtering
 * Uses empty query if no role specified (returns all users)
 */
const getAllUsersFromDB = async (role: string) => {
  const query = role ? { role } : {};
  return await User.find(query);
};

/**
 * Gets single user by email with populated follower/following data
 * Useful for profile pages and social connections
 */
const getSingleUserFromDB = async (email: string) => {
  return await User.findOne({ email })
    .populate("followers")
    .populate("following");
};

/**
 * Updates user document with partial data
 * Returns the updated document ({new: true})
 */
const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  return await User.findByIdAndUpdate(id, payload, { new: true });
};

/**
 * Handles bidirectional follow relationship between users
 * Uses $addToSet to prevent duplicate follows
 */
const followUser = async (payload: {
  userId: string;
  targetedUserId: string;
}) => {
  const { userId, targetedUserId } = payload;

  // Transaction-like update of both users' relationships
  await User.findByIdAndUpdate(
    targetedUserId,
    { $addToSet: { followers: userId } },
    { new: true }
  );

  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { following: targetedUserId } },
    { new: true }
  );
};

/**
 * Removes follow relationship in both directions
 * Uses $pull to remove references from both users
 */
const unFollowUser = async (payload: {
  userId: string;
  targetedUserId: string;
}) => {
  const { userId, targetedUserId } = payload;

  await User.findByIdAndUpdate(
    targetedUserId,
    { $pull: { followers: userId } },
    { new: true }
  );

  return await User.findByIdAndUpdate(
    userId,
    { $pull: { following: targetedUserId } },
    { new: true }
  );
};

/**
 * Permanently deletes user by ID
 * Note: Consider soft delete for production applications
 */
const deleteUserFromDB = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const userServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  followUser,
  unFollowUser,
};
