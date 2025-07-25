// Import Express framework and route modules from respective feature modules
import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";
import { CommentRoutes } from "../modules/comments/comments.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { StatisticsRoutes } from "../modules/statistics/statistics.route";
import { NotificationRoutes } from "../modules/notification/notification.route";
import { UploadRoutes } from "../modules/upload/upload.route";

// Create an Express Router instance
const router = express.Router();

// Define an array of route configurations
// Each object maps a base path to its corresponding route handler
const moduleRoutes = [
  {
    path: "/upload",
    route: UploadRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
  {
    path: "/comments",
    route: CommentRoutes,
  },
  {
    path: "/payments",
    route: PaymentRoutes,
  },
  {
    path: "/statistics",
    route: StatisticsRoutes,
  },
  {
    path: "/notification",
    route: NotificationRoutes,
  },
];

// Register all routes with the Express router
// Each route will be prefixed with its specified path
moduleRoutes.forEach((route) => router.use(route.path, route.route));

// Export the configured router to be used in the main application
export default router;
