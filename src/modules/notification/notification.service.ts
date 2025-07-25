import { TNotification } from "./notification.interface";
import { Notification } from "./notification.model";

/**
 * Creates a new notification record in the database
 */
const addNotificationToDB = async (payload: TNotification) => {
  return await Notification.create(payload);
};

/**
 * Retrieves notifications for a specific user, sorted by newest first
 */
const getNotificationsFromDB = async (userEmail: string) => {
  return await Notification.find({ userEmail })
    .sort({ createdAt: "descending" });
};

export const notificationServices = {
  addNotificationToDB,
  getNotificationsFromDB,
};