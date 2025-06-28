import { TNotification } from "./notification.interface";
import { Notification } from "./notification.model";

const addNotificationToDB = async (payload: TNotification) => {
  const result = await Notification.create(payload);
  return result;
};

const getNotificationsFromDB = async (userEmail: string) => {
  const result = await Notification.find({ userEmail }).sort({
    createdAt: "descending",
  });
  return result;
};

export const notificationServices = {
  addNotificationToDB,
  getNotificationsFromDB,
};
