

import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();


// get 
router.get('/',   userControllers.getAllUsers)
router.get('/:email', userControllers.getSingleUser)

// follow another user 
router.patch('/follow', userControllers.followUser)

// unFollow the user 
router.patch('/unfollow',  userControllers.unFollowUser)

router.put('/:id',  userControllers.updateUser)
router.delete('/:id',  userControllers.deleteUser)


export const UserRoutes = router;