import { Router } from 'express';
import authRouter from './auth.routes';
import checkRouter from './check.routes';

const router = Router();

router.use('/check', checkRouter);
router.use('/auth', authRouter);

export default router;
