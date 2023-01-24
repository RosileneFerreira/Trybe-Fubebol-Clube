import * as jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

export default class GenerateToken {
  public jwt = jsonwebtoken;

  public token(user: IUser): string {
    const payload = { email: user.email, password: user.password };
    return this.jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '7d' },
    );
  }
}
