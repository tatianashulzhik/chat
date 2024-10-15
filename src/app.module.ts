import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import CONNECTION from 'src/db.connection';
import { AppWebSocketGateway } from './websocket.gateway';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ChatsModule, UsersModule, MessagesModule, RolesModule],
  controllers: [],
  providers: [AppWebSocketGateway, AuthService],
})

export class AppModule { }
