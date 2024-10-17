import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.entity';
import { Chats } from '../chats/chats.entity';
import { Roles } from '../roles/roles.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Messages, Users, Chats, Roles]),
        UsersModule
    ],
    controllers: [MessagesController],
    providers: [MessagesService, JwtService],
    exports: [MessagesService],
})
export class MessagesModule { }
