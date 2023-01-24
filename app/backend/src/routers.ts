import { Router, Request, Response } from 'express';
import 'express-async-errors';
import AuthController from './controllers/AuthController';
import TeamController from './controllers/TeamController';

const routers: Router = Router();

const authController = new AuthController();
routers
  .post('/login', (req: Request, res: Response) => authController.login(req, res));

routers
  .get('/login/validate', (req: Request, res: Response) =>
    authController.typeRole(req, res));

const teamController = new TeamController();
routers.get('/teams', (req: Request, res: Response) => teamController.getAll(req, res));

export default routers;
