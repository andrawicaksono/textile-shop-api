import { Router } from 'express';
import { UserRepository } from '../../repositories/user.repository';
import { UserService } from '../../services/user.service';
import { UserController } from '../../controllers/buyer/user.controller';

const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/',
  userController.getUserProfile
);

userRouter.put('/update',
  userController.updateUserProfile
);

userRouter.delete('/delete',
  userController.deleteUserProfile
);

export default userRouter;
