import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../modules/user/user.model";
import jwt from "jsonwebtoken";
import config from "./index";

type VerifyCallback = (error: any, user?: any, info?: any) => void;

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id!,
      clientSecret: config.google_client_secret!,
      callbackURL: config.google_oauth_redirect!,
    },
    async (_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value });
        if (!user) {
  user = await User.create({
    name: profile.displayName,
    email: profile.emails?.[0].value,
    image: profile.photos?.[0].value,
    password: null,
    provider: "google",
    role: "user",
  });
}

        const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          config.jwt_access_secret!,
          { expiresIn: config.jwt_access_expires! }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err as Error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: config.github_client_id!,
      clientSecret: config.github_client_secret!,
      callbackURL: config.github_oauth_redirect!,
      scope: ["user:email"], // ensure email access
    },
    async (_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) => {
      try {
        let email = profile.emails?.[0]?.value;

        // If email not provided, fetch manually
        if (!email && _accessToken) {
          const response = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${_accessToken}`,
              Accept: "application/vnd.github.v3+json",
            },
          });
          const emails = await response.json();
          if (Array.isArray(emails) && emails.length > 0) {
            const primaryEmail = emails.find((e: any) => e.primary && e.verified);
            email = primaryEmail?.email || emails[0].email;
          }
        }

        if (!email) {
          return done(new Error("Email not found from GitHub"), null);
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: email,
            image: profile.photos?.[0]?.value || "",
            password: null,
            provider: "github",
            role: "user", // Add default role
          });
        }

        const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          config.jwt_access_secret!,
          { expiresIn: config.jwt_access_expires! }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


export default passport;
