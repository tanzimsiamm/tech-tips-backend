
import express from 'express';


import auth from '../../middlewares/auth';
import { postControllers } from './post.controller';
const router = express.Router();

// create 
router.post('/', auth('admin', 'user') , postControllers.createPost )

// vote and upvote 
router.post('/vote', auth('admin', 'user') , postControllers.votePost )


// update  
router.put('/:id', auth('admin','user'), postControllers.updatePost )

// delete  
router.delete('/:id', auth('admin', 'user') , postControllers.deletePost)

// get 
router.get('/',  postControllers.getAllPosts)


router.get('/:id', postControllers.getSinglePost)


export const PostRoutes = router;