import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ message: 'Validation failed', errors: errorMessages });
  }
  next();
}
