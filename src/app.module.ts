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
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { MinioClientModule } from './minio-client/minio-client.module';
import { MediaModule } from './media/media.module';
import { QuestionModule } from './questions/questions.module';
import { ArticlesModule } from './articles/articles.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ChatsModule,
    UsersModule,
    MessagesModule,
    RolesModule,
    NotificationsModule,
    PostsModule,
    MinioClientModule,
    MediaModule,
    QuestionModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [AppWebSocketGateway, AuthService, JwtStrategy],
})
export class AppModule { }
