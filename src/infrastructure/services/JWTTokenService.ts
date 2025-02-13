import { injectable } from 'tsyringe';
import { TokenService } from '@/core/services/tokenService';
import jwt from 'jsonwebtoken';

@injectable()
export class JWTTokenService implements TokenService {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';
  }

  generate(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verify(token: string): object | null {
    try {
      return jwt.verify(token, this.secretKey) as object;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
}
