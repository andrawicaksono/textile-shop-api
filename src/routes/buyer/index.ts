import { Router } from 'express';
import userRouter from './user.routes';
const buyerRouter = Router();

buyerRouter.use("/profile", userRouter);

export default buyerRouter;
