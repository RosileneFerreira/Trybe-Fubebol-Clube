import * as jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import HttpException from './http.exception';

export default class GenerateToken {
  public jwt = jsonwebtoken;

  public token(user: IUser): string {
    const payload = { id: user.id, email: user.email };
    return this.jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '7d' },
    );
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'Token not found');
    }

    try {
      const introspection = await this.jwt.verify(token, process.env.JWT_SECRET as string);
      return introspection;
    } catch (e) {
      throw new HttpException(401, 'Not authorized');
    }
  }
}
