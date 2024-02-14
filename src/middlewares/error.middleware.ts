import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../utils/error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      errors: err.message
    });
  }
};
