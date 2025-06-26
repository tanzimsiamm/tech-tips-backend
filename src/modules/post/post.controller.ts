
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { postServices } from "./post.service";


const createPost = catchAsync (async (req, res) => {
   const result = await postServices.createPostIntoDB(req.body);
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
})


const votePost = catchAsync (async (req, res) => {
   const result = await postServices.voteToPost(req.body);
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Voted successfully',
    data: result,
  });
})

const getAllPosts = catchAsync (async (req, res) => {

   const result = await postServices.getAllPostsFromDB(req.query);
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  });
})


const getSinglePost = catchAsync (async (req, res) => {

   const result = await postServices.getSinglePostFromDB(req.params.id);
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Post retrieved successfully',
    data: result,
  });
})

const updatePost = catchAsync (async (req, res) => {
   const result = await postServices.updatePostIntoDB(req.params.id , req.body);
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: result,
  });
})


const deletePost = catchAsync (async (req, res) => {
   const result = await postServices.deletePostFromDB(req.params.id);
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
    data: result,
  });
})



export const postControllers = {
    createPost, getAllPosts, getSinglePost, updatePost, deletePost, votePost
}