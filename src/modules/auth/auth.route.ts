
import express from 'express';
import { userValidations } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';
const router = express.Router();


router.post('/register', validateRequest(userValidations.userValidationSchema) , authControllers.createUser )

router.post('/login', validateRequest(authValidations.loginValidationSchema) , authControllers.loginUser )

export const AuthRoutes = router;