import { Router } from 'express';
import fabricCategoryRouter from './fabricCategory.routes';
const sellerRouter = Router();

sellerRouter.use("/category", fabricCategoryRouter)

export default sellerRouter;
