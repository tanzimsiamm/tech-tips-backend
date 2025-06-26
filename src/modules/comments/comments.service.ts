import { TComment } from "./comments.interface";
import { Comment } from "./comments.model";

const addCommentToDB = async (payload: TComment) => {
  const result = await Comment.create(payload);
  return result;
};

const getCommentsFromDB = async (postId: string) => {
  const result = await Comment.find({ postId }).sort({
    createdAt: "descending",
  });
  return result;
};

const deleteCommentFromDB = async (commentId: string) => {
  const result = await Comment.findByIdAndDelete(commentId);
  return result;
};

const updateCommentIntoDB = async (
  commentId: string,
  payload: Partial<TComment>
) => {
  const result = await Comment.findByIdAndUpdate(commentId, payload, {
    new: true,
  });
  return result;
};

export const commentServices = {
  addCommentToDB,
  getCommentsFromDB,
  deleteCommentFromDB,
  updateCommentIntoDB,
};
