import { Router, Request, Response } from 'express';
import AuthController from './controllers/AuthController';

const routers: Router = Router();

const authController = new AuthController();
routers
  .post('/login', (req: Request, res: Response) => authController.login(req, res));

export default routers;
