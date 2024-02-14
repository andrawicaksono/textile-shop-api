import { Router } from 'express';

import authRouter from './auth.routes';
import checkRouter from './check.routes';
import fileRouter from './file.routes';
import userRouter from './user.routes';
import todoRouter from './todo.routes';
import fabricCategoryRouter from './fabricCategory.routes';
import fabricRouter from './fabric.routes';

const router = Router();

router.use('/check', checkRouter);
router.use('/auth', authRouter);
router.use('/file', fileRouter);
router.use('/profile', userRouter);
router.use('/todo', todoRouter);
router.use('/category', fabricCategoryRouter);
router.use('/fabric', fabricRouter)

export default router;
