import { Router } from 'express';
import {
  CreateNewUser,
  LoginUser,
  VerifySignupEmail,
} from '../controllers/userController.js';
import {
  validateLoginMiddleware,
  validateSignupMiddleware,
} from '../middlewares/userMiddleware.js';

const UserRouter = Router();

UserRouter.post('/signup', validateSignupMiddleware, CreateNewUser);
UserRouter.get('/signup/verify', VerifySignupEmail);
UserRouter.post('/login', validateLoginMiddleware, LoginUser);

export default UserRouter;
