import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { CONNECTION } from 'src/config';
import { AuthService } from 'src/auth/auth.service';
import { AppWebSocketGateway } from './gateway/websocket.gateway';
import { NotificationsModule } from './notifications/notifications.module';


@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ChatsModule, UsersModule, MessagesModule, RolesModule, NotificationsModule],
  controllers: [],
  providers: [AppWebSocketGateway, AuthService],
})

export class AppModule { }
