import { Router, Request, Response } from 'express';
import 'express-async-errors';
import AuthController from './controllers/AuthController';
import MatchController from './controllers/MatchController';
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
routers.get('/teams/:id', (req: Request<{ id: number }>, res: Response) =>
  teamController.getTeam(req, res));

const matchController = new MatchController();
routers.get('/matches', (req: Request, res: Response) => matchController.getAll(req, res));

export default routers;
