import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto'
import { MINIO_CONFIG } from '../config';

@Injectable()
export class MinioClientService {
    private readonly logger: Logger;
    private readonly baseBucket = MINIO_CONFIG.MINIO_BUCKET

    public get client() {
        return this.minio.client;
    }

    constructor(
        private readonly minio: MinioService,
    ) {
        this.logger = new Logger('MinioStorageService');
    }

    public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
            throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
        }

        const temp_filename = Date.now().toString();
        const hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const metaData = {
            'Content-Type': file.mimetype,
            'X-Amz-Meta-Testing': 1234,
        };
        const filename = `${hashedFileName}${ext}`;
        const fileBuffer = file.buffer;

        await this.client.putObject(baseBucket, filename, fileBuffer, fileBuffer.length, metaData)
            .catch(err => {
                throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
            });

        return {
            url: `http://${MINIO_CONFIG.MINIO_ENDPOINT}:${MINIO_CONFIG.MINIO_PORT_CONSOLE}/browser/${MINIO_CONFIG.MINIO_BUCKET}/${filename}`
        };
    }

    async delete(objectName: string, baseBucket: string = this.baseBucket): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.removeObject(baseBucket, objectName, (err) => {
                if (err) {
                    this.logger.error(`Error deleting file ${objectName} from MinIO`, err);
                    reject(new HttpException("Oops! Something went wrong", HttpStatus.BAD_REQUEST));
                } else {
                    this.logger.log(`File ${objectName} deleted successfully from ${baseBucket}`);
                    resolve();
                }
            });
        });
    }
}
