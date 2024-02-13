import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRegisterDTO, UserLoginDTO } from '../dto/user.dto';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserRegisterDTO = req.body;
      const [user, error] = await this.authService.registerUser(userData);

      if (error) {
        throw error;
      }

      return res.status(201).json(user);
    } catch (error: any) {
      next(error)
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData: UserLoginDTO = req.body;
      const [user, error] = await this.authService.loginUser(loginData);

      if (error) {
        throw error;
      }

      return res.status(200).json(user);
    } catch (error: any) {
      next(error)
    }
  };
}
