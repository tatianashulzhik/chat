import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MinioClientModule } from '../minio-client/minio-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { PostsModule } from '../posts/posts.module';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [
    MinioClientModule,
    TypeOrmModule.forFeature([Media]),
    PostsModule,
    ArticlesModule
  ],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule { }
