import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, ValidationPipe, UsePipes, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.postsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post()
    create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
        //@ts-ignore
        const authorId = req.user.id;
        return this.postsService.create(createPostDto, authorId);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
        //@ts-ignore
        const userId = req.user.id;
        return this.postsService.update(id, updatePostDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number, @Req() req: Request) {
        //@ts-ignore
        const userId = req.user.id;
        return this.postsService.remove(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/published')
    updateStatusPublished(@Param('id') id: number, @Req() req: Request) {
        //@ts-ignore
        const userId = req.user.id;
        return this.postsService.updateStatusPublished(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/archived')
    updateStatusArchived(@Param('id') id: number, @Req() req: Request) {
        //@ts-ignore
        const userId = req.user.id;
        return this.postsService.updateStatusArchived(id, userId);
    }
}
