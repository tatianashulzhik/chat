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
    @Post(':postId/single')
    @UseInterceptors(FileInterceptor('image'))
    async uploadSingle(
        @UploadedFile() image: BufferedFile,
        @Param('postId', ParseIntPipe) postId: number
    ) {
        return await this.mediaService.uploadSingle(image, postId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':fileName')
    async deleteFile(@Param('fileName') fileName: string) {
        try {
            await this.mediaService.deleteFile(fileName);
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
