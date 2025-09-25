import express from "express";
import { userValidations } from "../user/user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { authControllers } from "./auth.controller";
import { authValidations } from "./auth.validation";
import passport from "../../config/passport";
import config from "../../config";

const router = express.Router();

// User registration route
router.post(
  "/register",
  validateRequest(userValidations.userValidationSchema),
  authControllers.createUser
);

// User login route
router.post(
  "/login",
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser
);

// Google login entry
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    const { user, token } = req.user;
    const userStr = encodeURIComponent(JSON.stringify(user));
    res.redirect(`${config.frontend_url}/oauth/callback/google?token=${token}&user=${userStr}`);
  }
);

// GitHub login entry
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    const { user, token } = req.user;
    const userStr = encodeURIComponent(JSON.stringify(user));
    res.redirect(`${config.frontend_url}/oauth/callback/github?token=${token}&user=${userStr}`);
  }
);

export const AuthRoutes = router;
