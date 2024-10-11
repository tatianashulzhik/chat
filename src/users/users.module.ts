import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Messages } from '../messages/messages.entity';
import { Chats } from '../chats/chats.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Admins } from '../admins/ admins.entity';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Roles } from '../roles/roles.entity';
import { RolesGuard } from '../guards/roles.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, Messages, Admins, Chats, Roles]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy, ConfigService, RolesGuard],
    exports: [UsersService],
})

export class UsersModule { }
