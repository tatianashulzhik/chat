import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../types/types';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { JWT } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT.secret,
    });
  }

  async validate(user: IUser): Promise<Users> {
    const userWithRole = await this.usersService.findByIdWithRole(user.id);

    if (!userWithRole) {
      throw new UnauthorizedException();
    }

    return userWithRole;
  }
}
