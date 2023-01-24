import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { ILogin } from '../interfaces/login.interface';
import HttpException from '../utils/http.exception';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request<object, object, ILogin>, res: Response) {
    const token = await this.authService.login(req.body);
    res.status(200).json(token);
  }

  public async typeRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException(401, 'Unauthorized');
    }

    const validRole = await this.authService.getRole(authorization);
    res.status(200).json({ role: validRole });
  }
}

export default AuthController;
