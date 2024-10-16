import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Users } from '../users/users.entity';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Posts, Users, MinioClientModule]),
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostsModule { }
