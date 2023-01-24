import { Router, Request, Response } from 'express';
import 'express-async-errors';
import AuthController from './controllers/AuthController';

const routers: Router = Router();

const authController = new AuthController();
routers
  .post('/login', (req: Request, res: Response) => authController.login(req, res));

routers
  .get('/login/validate', (req: Request, res: Response) =>
    authController.typeRole(req, res));

export default routers;
