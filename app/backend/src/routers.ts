import { Router, Request, Response } from 'express';
import AuthController from './controllers/AuthController';
import loginValidation from './services/validations/loginValidation';

const routers: Router = Router();

const authController = new AuthController();
routers
  .post('/login', loginValidation, (req: Request, res: Response) => authController.login(req, res));

export default routers;
