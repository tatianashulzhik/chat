import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT } from '../config';

@Injectable()
export class AuthService {
    private readonly JWT_SECRET = JWT.secret

    async validateToken(token: string): Promise<any> {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return decoded;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
