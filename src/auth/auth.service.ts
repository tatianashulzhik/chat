import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly JWT_SECRET = 'secret';

    async validateToken(token: string): Promise<any> {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return decoded;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
