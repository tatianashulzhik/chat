import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import CONNECTION from 'src/db.connection';


@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ChatsModule, UsersModule, AdminsModule, MessagesModule, RolesModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
