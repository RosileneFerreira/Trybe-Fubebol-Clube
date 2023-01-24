import { compareSync } from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import User from '../database/models/User';
import GenerateToken from '../utils/jwt';
import { ILogin } from '../interfaces/login.interface';
import HttpException from '../utils/http.exception';
import loginValidation from './validations/loginValidation';

export default class AuthService {
  public userModel = User;
  public validToken = new GenerateToken();
  public jwt = jsonwebtoken;

  public async login(loginBody: ILogin) {
    const { email, password } = loginBody;
    loginValidation(loginBody);
    const user = await this.userModel.findOne({ where: { email: loginBody.email } });

    const unauthorized = 'Incorrect email or password';

    if (!user) {
      throw new HttpException(401, unauthorized);
    }

    const validPassword = compareSync(loginBody.password, user.password);
    if (!validPassword) {
      throw new HttpException(401, unauthorized);
    }

    if (loginBody.email !== email || loginBody.password !== password) {
      throw new HttpException(401, unauthorized);
    }

    const token = this.validToken.token(user);
    return { token };
  }

  public async getRole(token: string) {
    const result = this.jwt.verify(token, process.env.JWT_SECRET as string) as ILogin;
    const { email } = result;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    return user.dataValues.role;
  }
}
