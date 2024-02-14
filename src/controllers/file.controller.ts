import { NextFunction, Request, Response } from 'express';
import { FileService } from '../services/file.service';
import { ApplicationError } from '../utils/error';

export class FileController {
  private fileService: FileService;

  constructor(fileService: FileService) {
    this.fileService = fileService;
  }

  uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) {
        throw new ApplicationError("No file uploaded", 400);
      }

      res.status(200).json({
        statusCode: 200,
        message: 'File uploaded successfully',
        filepath: "/api/v1/file/download/" + file.filename
      });
    } catch (error: any) {
      next(error)
    }
  }

  getFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filename = req.params.filename as string;
      const [fileData, error] = await this.fileService.getFile(filename);

      if (error) {
        throw error
      }

      if (!fileData) {
        throw new ApplicationError("File not found", 404)
      }

      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      res.setHeader('Content-Type', 'image/jpg');

      fileData.on('error', (error) => {
        res.setHeader('Content-Type', 'application/json');
        throw error
      });

      fileData.on('data', (data) => {
        res.write(data);
      });

      fileData.on('end', () => {
        res.end()
      });
    } catch (error: any) {
      next(error)
    }
  }
}
