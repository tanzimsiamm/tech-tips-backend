import express from "express";
import auth from "../../middlewares/auth";
import { notificationController } from "./notification.controller";
const router = express.Router();

// get Notifications
router.get(
  "/:userEmail",
  auth("user", "admin"),
  notificationController.getNotifications
);

// push notification
router.post(
  "/push",
  auth("user", "admin"),
  notificationController.addNotification
);

export const NotificationRoutes = router;
