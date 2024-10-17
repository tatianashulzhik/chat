import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { MINIO_CONFIG } from '../config';

@Module({
  imports: [
    MinioModule.register({
      endPoint: MINIO_CONFIG.MINIO_ENDPOINT,
      port: +MINIO_CONFIG.MINIO_PORT,
      useSSL: false,
      accessKey: MINIO_CONFIG.MINIO_ACCESSKEY,
      secretKey: MINIO_CONFIG.MINIO_SECRETKEY,
    })
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule { }
