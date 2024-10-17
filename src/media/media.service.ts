import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BufferedFile } from '../minio-client/file.model';
import { MinioClientService } from '../minio-client/minio-client.service';
import { Media } from './media.entity';
import { Repository } from 'typeorm';
import { Posts } from '../posts/posts.entity';
import { MINIO_CONFIG } from '../config';
import { PostsService } from '../posts/posts.service';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class MediaService {
    constructor(
        private minioClientService: MinioClientService,
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
        private readonly postsService: PostsService,
        private readonly articlesService: ArticlesService,
    ) { }

    async uploadSinglePosts(image: BufferedFile, postId: number) {

        let uploadedImage = await this.minioClientService.upload(image)
        const post = await this.postsService.findOne(postId);

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

    async deleteFilePosts(fileName: string) {
        const fileUrl = `http://${MINIO_CONFIG.MINIO_ENDPOINT}:${MINIO_CONFIG.MINIO_PORT_CONSOLE}/browser/${MINIO_CONFIG.MINIO_BUCKET}/${fileName}`;

        await this.minioClientService.delete(fileName);

        const mediaToDelete = await this.mediaRepository.findOne({ where: { url: fileUrl } });

        if (mediaToDelete) {
            await this.mediaRepository.remove(mediaToDelete);
        }
    }

    async uploadSingleArticles(image: BufferedFile, articleId: number) {

        let uploadedImage = await this.minioClientService.upload(image)
        const article = await this.articlesService.findOne(articleId);

        if (!article) {
            throw new NotFoundException('Posts not found');
        }

        const media = this.mediaRepository.create({
            url: uploadedImage.url,
            contentType: image.mimetype,
            article
        });

        const savedMedia = await this.mediaRepository.save(media);

        return {
            imageUrl: uploadedImage.url,
            message: "Successfully uploaded to MinIO and saved in the database",
            media: savedMedia,
        };
    }

    async deleteFileArticles(fileName: string) {
        const fileUrl = `http://${MINIO_CONFIG.MINIO_ENDPOINT}:${MINIO_CONFIG.MINIO_PORT_CONSOLE}/browser/${MINIO_CONFIG.MINIO_BUCKET}/${fileName}`;

        await this.minioClientService.delete(fileName);

        const mediaToDelete = await this.mediaRepository.findOne({ where: { url: fileUrl } });

        if (mediaToDelete) {
            await this.mediaRepository.remove(mediaToDelete);
        }
    }
}
