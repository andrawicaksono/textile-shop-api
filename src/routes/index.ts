import { Router } from 'express';
import authRouter from './auth.routes';
import checkRouter from './check.routes';
import buyerRouter from './buyer';
import fileRouter from './file.routes';
import userRouter from './user.routes';
import { authenticateJWT, checkRole } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';
import sellerRouter from './seller';
import todoRouter from './todo.routes';

const router = Router();

// General Routes
router.use('/check', checkRouter);
router.use('/auth', authRouter);
router.use('/file', authenticateJWT, fileRouter);
router.use('/profile', authenticateJWT, userRouter);
router.use('/todo', todoRouter);

// Buyer Routes
router.use('/buyer', authenticateJWT, checkRole(UserRole.BUYER), buyerRouter);
router.use('/seller', authenticateJWT, checkRole(UserRole.SELLER), sellerRouter);

export default router;
