import { compareSync } from 'bcryptjs';
import User from '../database/models/User';
import GenerateToken from '../utils/jwt';
import { ILogin } from '../interfaces/login.interface';
import HttpException from '../utils/http.exception';

export default class AuthService {
  public userModel = User;
  public validToken = new GenerateToken();

  public async login(loginBody: ILogin) {
    const user = await this.userModel.findOne({ where: { email: loginBody.email } });

    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const validPassword = compareSync(loginBody.password, user.password);
    if (!validPassword) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = this.validToken.token(user);
    return { token };
  }
}
