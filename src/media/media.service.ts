import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { Media } from './media.entity';
import { Repository } from 'typeorm';
import { Posts } from 'src/posts/posts.entity';
import { MINIO_CONFIG } from 'src/config';

@Injectable()
export class MediaService {
    constructor(
        private minioClientService: MinioClientService,
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
    ) { }

    async uploadSingle(image: BufferedFile, postId: number) {

        let uploadedImage = await this.minioClientService.upload(image)
        const post = await this.postsRepository.findOne({ where: { id: postId } });

        if (!post) {
            throw new NotFoundException('Posts not found');
        }

        const media = this.mediaRepository.create({
            url: uploadedImage.url,
            contentType: image.mimetype,
            post
        });

        const savedMedia = await this.mediaRepository.save(media);

        return {
            imageUrl: uploadedImage.url,
            message: "Successfully uploaded to MinIO and saved in the database",
            media: savedMedia,
        };
    }

    async deleteFile(fileName: string) {
        const fileUrl = `http://${MINIO_CONFIG.MINIO_ENDPOINT}:${MINIO_CONFIG.MINIO_PORT_CONSOLE}/browser/${MINIO_CONFIG.MINIO_BUCKET}/${fileName}`;

        await this.minioClientService.delete(fileName);

        const mediaToDelete = await this.mediaRepository.findOne({ where: { url: fileUrl } });

        if (mediaToDelete) {
            await this.mediaRepository.remove(mediaToDelete);
        }
    }
}
