import { Schema, model } from "mongoose";
import { TNotification } from "./notification.interface";

const notificationSchema = new Schema<TNotification>(
  {
    text: {
      type: String,
      required: true,
    },
    commentedUserPic: {
      type: String,
      required: true,
    },
    commentedUser: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Notification = model<TNotification>(
  "Notification",
  notificationSchema
);
