import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookie(request);

        if (!token) {
            throw new UnauthorizedException('JWT token not found in cookies');
        }

        request.headers.authorization = `Bearer ${token}`;

        return super.canActivate(context);
    }

    extractTokenFromCookie(request: Request): string | null {
        const cookie = request.cookies['jwt'];

        if (!cookie) {
            return null;
        }
        return cookie;
    }
}
