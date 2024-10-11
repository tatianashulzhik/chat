import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.entity';
import { Chats } from '../chats/chats.entity';
import { Roles } from '../roles/roles.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Messages, Users, Chats, Roles]),
    ],
    controllers: [MessagesController],
    providers: [MessagesService, JwtStrategy, ConfigService, UsersService, JwtService],
    exports: [MessagesService],
})
export class MessagesModule { }
