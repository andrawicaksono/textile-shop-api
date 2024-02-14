import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { FileService } from '../services/file.service';
import multer from 'multer';
import { upload } from '../middlewares/file.middleware';

const fileRouter = Router();

const fileService = new FileService();
const fileController = new FileController(fileService);

fileRouter.post('/upload', upload, fileController.uploadFile);

fileRouter.get('/download/:filename', fileController.getFile);

export default fileRouter;
