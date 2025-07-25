import { TComment } from "./comments.interface";
import { Comment } from "./comments.model";

/**
 * Adds a new comment to the database
 */
const addCommentToDB = async (payload: TComment) => {
  return await Comment.create(payload);
};

/**
 * Gets all comments for a specific post, sorted by newest first
 */
const getCommentsFromDB = async (postId: string) => {
  return await Comment.find({ postId }).sort({ createdAt: "descending" });
};

/**
 * Permanently deletes a comment by ID
 */
const deleteCommentFromDB = async (commentId: string) => {
  return await Comment.findByIdAndDelete(commentId);
};

/**
 * Updates an existing comment and returns the modified version
 */
const updateCommentIntoDB = async (
  commentId: string,
  payload: Partial<TComment>
) => {
  return await Comment.findByIdAndUpdate(commentId, payload, { new: true });
};

export const commentServices = {
  addCommentToDB,
  getCommentsFromDB,
  deleteCommentFromDB,
  updateCommentIntoDB,
};