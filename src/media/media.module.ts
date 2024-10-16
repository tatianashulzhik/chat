import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { Posts } from 'src/posts/posts.entity';

@Module({
  imports: [
    MinioClientModule,
    TypeOrmModule.forFeature([Media, Posts]),
  ],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule { }
