import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { notificationServices } from "./notification.service";

const addNotification = catchAsync(async (req, res) => {
  const result = await notificationServices.addNotificationToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification pushed successfully",
    data: result,
  });
});

const getNotifications = catchAsync(async (req, res) => {
  const result = await notificationServices.getNotificationsFromDB(
    req.params?.userEmail
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "notifications retrieved successfully",
    data: result,
  });
});

export const notificationController = {
  addNotification,
  getNotifications,
};
