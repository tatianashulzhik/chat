import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './chats.entity';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../roles/roles.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, Chats, Roles]),
    ],
    controllers: [ChatsController],
    providers: [ChatsService, UsersService, JwtService],
    exports: [ChatsService],

})
export class ChatsModule { }
