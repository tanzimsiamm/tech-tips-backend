/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { TPost, TPostsQuery } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const voteToPost = async (payload: {
  postId: string;
  userId: string;
  voteType: "upvote" | "downvote";
}) => {
  const { postId, userId, voteType } = payload;
  const post = await Post.findById(postId);

  if (!post) throw new Error("Post not found");

  post.voters = post.voters || [];

  const existingVote = post.voters.find(voter => voter.userId === userId);

  if (existingVote) {
    if (existingVote.voteType === voteType) {
      // Remove vote
      post.voters = post.voters.filter(v => v.userId !== userId);
    } else {
      // Change vote
      existingVote.voteType = voteType;
    }
  } else {
    // Add vote
    post.voters.push({ userId, voteType });
  }

  // Recalculate votes
  const upvotes = post.voters.filter(v => v.voteType === "upvote").length;
  const downvotes = post.voters.filter(v => v.voteType === "downvote").length;
  post.votes = upvotes - downvotes;

  return await post.save();
};



const getAllPostsFromDB = async (query: TPostsQuery) => {
  const filter: Record<string, unknown> = {};

  // Add search value to filter if provided
  if (query.searchTerm) {
    filter.$or = [
      { title: { $regex: query.searchTerm, $options: "i" } },
      { description: { $regex: query.searchTerm, $options: "i" } },
    ];
  }

  // Add userEmail to filter if provided
  if (query.userEmail) {
    filter["authorInfo.email"] = query.userEmail;
  }

  // Add status to filter if provided
  if (query.category) {
    filter.category = query.category;
  }

  // Set sort option based on sortByUpvote if provided
  const sortOption: {
    votes?: SortOrder;
  } = {};

  if (query.sortByUpvote) {
    sortOption.votes = query?.sortByUpvote === "1" ? "ascending" : "descending";
  }

  const posts = await Post.find(filter)
    .sort({ ...sortOption, createdAt: "descending" })
    .skip(Number(query?.skip))
    .limit(Number(query?.limit));

  const totalPosts = await Post.countDocuments();
  return { totalPosts, posts };
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id);
  return result;
};

const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndDelete(id);
  return result;
};

export const postServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  voteToPost,
  deletePostFromDB,
};
