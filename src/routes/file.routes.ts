import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { FileService } from '../services/file.service';
import { upload } from '../middlewares/file.middleware';
import { authenticateJWT } from '../middlewares/auth.middleware';

const fileRouter = Router();

const fileService = new FileService();
const fileController = new FileController(fileService);

fileRouter.post('/upload', authenticateJWT, upload, fileController.uploadFile);

fileRouter.get('/download/:filename', fileController.getFile);

export default fileRouter;
