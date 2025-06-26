/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { TPost, TPostsQuery } from "./post.interface";
import { Post} from "./post.model";

const createPostIntoDB = async (payload : TPost) => {
    const result = await Post.create(payload);
    return result;
}



const voteToPost = async (payload : { 
  postId: string, 
  userId: string, 
  voteType: string
}) => {

  const { postId, userId, voteType } = payload;
  const post = await Post.findById(postId);


  // Check if the user has already voted on this post
  const existingVote = post?.voters?.find(voter => voter.userId === userId);

  if (existingVote) {
    
    // If the user has already voted and tries to change their vote
    if (existingVote.voteType !== voteType) {
      if (voteType === 'upvote') {
        post!.votes! += 2; // Change from downvote (-1) to upvote (+1), so +2
      } else if (voteType === 'downvote') {
        post!.votes! -= 2; // Change from upvote (+1) to downvote (-1), so -2
      }

      // Update the vote type in the voters array
      existingVote.voteType = voteType;
    }else{
     const restVoters =  post?.voters?.filter(voter => voter.userId !== userId)
     post!.voters = restVoters;

     if(voteType === 'downvote')post!.votes! += 1;
     if(voteType === 'upvote')post!.votes! -= 1;
    }
  } else {
    // If the user has not voted, add a new vote
    post!.voters!.push({ userId, voteType });

    if (voteType === 'upvote') {
      post!.votes! += 1; // Increment votes by 1 for upvote
    } else if (voteType === 'downvote') {
      post!.votes! -= 1; // Decrease votes by 1 for downvote
    }
  }

  // Save the post with the updated vote count
 const res = await post?.save();
  return res
}



const getAllPostsFromDB = async (query : TPostsQuery) => {
        const filter : Record<string ,unknown> = {};
  
        //  {
                // searchTerm : 'tangail'
                // userEmail : '@gmil.com'
               // category : 'Ai'
                // sortByUpvote : -1
                // skip : 0
                // limit : 10
        //  }
  
    // Add search value to filter if provided
    if (query.searchTerm) {
      filter.$or = [
        { title: { $regex: query.searchTerm, $options: 'i' } },
        { description: { $regex: query.searchTerm, $options: 'i' } },
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
    const sortOption : {
       votes?: SortOrder;
      } = {};
  
    if (query.sortByUpvote) {
      sortOption.votes = query?.sortByUpvote === '1'? 'ascending': 'descending';
    }

    const posts = await Post.find(filter).sort({...sortOption, createdAt : 'descending', }).skip(Number(query?.skip)).limit(Number(query?.limit))

    const totalPosts = await Post.countDocuments()
    return { totalPosts, posts};
}


const getSinglePostFromDB = async (id: string) => {
    const result = await Post.findById(id);
    return result;
}

const updatePostIntoDB = async (id: string , payload: Partial<TPost>) => {
    const result = await Post.findByIdAndUpdate(id, payload ,{new: true });
    return result;
}


const deletePostFromDB = async ( id: string) => {
    const result = await Post.findByIdAndDelete(id);
    return result;
}


export const postServices = {
    createPostIntoDB,
    getAllPostsFromDB,
    getSinglePostFromDB,
    updatePostIntoDB, voteToPost, deletePostFromDB
}