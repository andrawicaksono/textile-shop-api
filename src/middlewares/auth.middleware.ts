import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/user.model';
import { jwtConfig } from '../config/jwt.config';
import { UserDTO } from '../dto/user.dto';

declare module 'express' {
  interface Request {
    user?: UserDTO;
  }
};

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = new UserRepository();

    const token = req.headers.authorization?.split(' ')[1] || '';

    const decoded: any = jwt.verify(token, jwtConfig.jwtSecret || '');

    if (!decoded.userId) {
      return res.status(401).json({
        statusCode: 401,
        message: "Authorization failed"
      })
    }

    const [user, errorUser] = await userRepository.findUserById(decoded.userId);
    if (errorUser) {
      throw errorUser;
    }

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "User not found"
      })
    }
    
    req.user = user;

    next();
  } catch (error: any) {
    next(error);
  }
};

export const checkRole = (role: UserRole) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role != role) {
        return res.status(403).json({
          statusCode: 403,
          message: "Access denied"
        })
      }
      
      next();
    }
    catch(error: any) {
      next(error);
    }
}
