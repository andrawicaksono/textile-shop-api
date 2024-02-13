import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../models/user.model';
import { jwtConfig } from '../config/jwt.config';

declare module 'express' {
  interface Request {
    user?: User;
  }
};

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = new UserRepository();

    const token = req.headers.authorization?.split(' ')[1] || '';

    const decoded: any = jwt.verify(token, jwtConfig.jwtSecret || '');

    if (!decoded.userId) {
      return res.status(401).json({ message: "Authorization failed"})
    }

    const [user, errorUser] = await userRepository.findUserById(decoded.userId);
    if (errorUser) {
      throw errorUser;
    }

    if (!user) {
      return res.status(401).json({ message: "User not found"})
    }
    
    req.user = user;

    next();
  } catch (error: any) {
    next(error);
  }
};

export const checkRole = async (role: UserRole) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role != role) {
        return res.status(403).json({ message: "Access denied"})
      }
      
      next();
    }
    catch(error: any) {
      next(error);
    }
}
