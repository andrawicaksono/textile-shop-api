import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../services/user.service';
import { UserUpdateDTO, UserDTO } from '../../dto/user.dto';
import { ApplicationError } from '../../utils/error';

declare module 'express' {
  interface Request {
    user?: UserDTO;
  }
};

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new ApplicationError("User unauthorized", 401)
      }

      const [user, error] = await this.userService.getUserById(userId);

      if (error) {
        throw error;
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Get user profile success",
        data: user
      });
    } catch (error: any) {
      next(error)
    }
  };

  updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new ApplicationError("User unauthorized", 401)
      }
      
      const userData: UserUpdateDTO = req.body;
      const [updatedUser, error] = await this.userService.updateUserDetails(userId, userData);

      if (error) {
        throw error;
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Update user profile success",
        data: updatedUser
      });
    } catch (error: any) {
      next(error)
    }
  };

  deleteUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new ApplicationError("User unauthorized", 401)
      }

      const [success, error] = await this.userService.deleteUserById(userId);

      if (error) {
        throw error;
      }

      if (!success) {
        throw new ApplicationError("Delete user failed", 500);
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Delete user success"
      });
    } catch (error: any) {
      next(error)
    }
  };
}
