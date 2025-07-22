import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";
import { CommentRoutes } from "../modules/comments/comments.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { StatisticsRoutes } from "../modules/statistics/statistics.route";
import { NotificationRoutes } from "../modules/notification/notification.route";
import { UploadRoutes } from "../modules/upload/upload.route";

const router = express.Router();

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

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
