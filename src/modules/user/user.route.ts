

import express from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';
const router = express.Router();


// get 
router.get('/', auth('admin' ,'user'),  userControllers.getAllUsers)
router.get('/:email', auth('admin','user'), userControllers.getSingleUser)

// follow another user 
router.patch('/follow', auth('admin', 'user'), userControllers.followUser)

// unFollow the user 
router.patch('/unfollow', auth('admin', 'user'), userControllers.unFollowUser)

router.put('/:id', auth('admin', 'user'), userControllers.updateUser)
router.delete('/:id', auth('admin'), userControllers.deleteUser)


export const UserRoutes = router;