import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/http.exception';

const httpErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = err as HttpException;
  if (status) {
    return res.status(status || 500).json({ message });
  }
  next();
};

export default httpErrorMiddleware;
