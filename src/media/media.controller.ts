import { Controller, Delete, HttpException, HttpStatus, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { MediaService } from './media.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('media')
export class MediaController {
    constructor(
        private mediaService: MediaService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('post/:postId/single')
    @UseInterceptors(FileInterceptor('image'))
    async uploadSinglePosts(
        @UploadedFile() image: BufferedFile,
        @Param('postId', ParseIntPipe) postId: number
    ) {
        return await this.mediaService.uploadSinglePosts(image, postId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('posts/:fileName')
    async deleteFilePosts(@Param('fileName') fileName: string) {
        try {
            await this.mediaService.deleteFilePosts(fileName);
            return {
                message: 'File deleted successfully',
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Error deleting file',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('articles/:postId/single')
    @UseInterceptors(FileInterceptor('image'))
    async uploadSingleArticles(
        @UploadedFile() image: BufferedFile,
        @Param('postId', ParseIntPipe) postId: number
    ) {
        return await this.mediaService.uploadSingleArticles(image, postId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('articles/:fileName')
    async deleteFileArticles(@Param('fileName') fileName: string) {
        try {
            await this.mediaService.deleteFileArticles(fileName);
            return {
                message: 'File deleted successfully',
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Error deleting file',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
