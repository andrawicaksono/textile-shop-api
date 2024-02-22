import { Router } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


userRouter.get('/',
  authenticateJWT,
  userController.getUserProfile
);

userRouter.put('/',
  authenticateJWT,
  userController.updateUserProfile
);

userRouter.delete('/',
  authenticateJWT,
  userController.deleteUserProfile
);

export default userRouter;
