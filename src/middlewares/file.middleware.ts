
import multer from 'multer';
import { RequestHandler } from 'express';
import { ApplicationError } from '../utils/error';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApplicationError('Only images are allowed', 400));
  }
};

const uploadMiddleware = multer({ storage: storage, fileFilter: fileFilter });

export const upload: RequestHandler = uploadMiddleware.single('file');
