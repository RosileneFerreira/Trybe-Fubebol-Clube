import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { ILogin } from '../interfaces/login.interface';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request<object, object, ILogin>, res: Response) {
    const token = await this.authService.login(req.body);
    res.status(200).json(token);
  }
}

export default AuthController;
