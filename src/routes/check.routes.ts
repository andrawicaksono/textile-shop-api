import { Router } from 'express';
import { CheckController } from '../controllers/check.controller';

const checkController = new CheckController()

const checkRouter = Router();

checkRouter.get('/health', checkController.checkHealth
);
export default checkRouter;
