import { Schema, model } from "mongoose";
import { TComment } from "./comments.interface";

const commentSchema = new Schema<TComment>(
  {
    comment: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userInfo: {
      type: {
        name: String,
        email: String,
        image: String,
      },
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = model<TComment>("Comment", commentSchema);
