import { Request, Response, NextFunction } from 'express';
import GenerateToken from '../utils/jwt';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';

  const generateToken = new GenerateToken();
  const payload = await generateToken.authenticateToken(token);
  res.locals.payload = payload;

  next();
};

export default authMiddleware;
