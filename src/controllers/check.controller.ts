import { NextFunction, Request, Response } from 'express';

export class CheckController {
  checkHealth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        message: "OK"
      });
    } catch (error: any) {
      next(error)
    }
  };
}
