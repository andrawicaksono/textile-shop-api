import { Router } from 'express';
import authRouter from './auth.routes';
import checkRouter from './check.routes';
import buyerRouter from './buyer';
import fileRouter from './file.routes';
import userRouter from './user.routes';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// General Routes
router.use('/check', checkRouter);
router.use('/auth', authRouter);
router.use('/file', authenticateJWT, fileRouter);
router.use('/profile', authenticateJWT, userRouter);

// Buyer Routes
router.use('/buyer', buyerRouter)

export default router;
