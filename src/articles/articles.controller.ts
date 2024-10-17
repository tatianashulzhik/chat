import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { UpdateArticlesDto } from './dto/update-articles.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Get()
    findAll() {
        return this.articlesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.articlesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post()
    create(@Req() req: Request, @Body() createArticlesDto: CreateArticlesDto) {
        //@ts-ignore
        const authorId = req.user.id;
        return this.articlesService.create(createArticlesDto, authorId);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateArticlesDto: UpdateArticlesDto, @Req() req: Request) {
        //@ts-ignore
        const userId = req.user.id;
        return this.articlesService.update(id, updateArticlesDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number, @Req() req: Request) {
        //@ts-ignore
        const userId = req.user.id;
        return this.articlesService.remove(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/published')
    updateStatusPublished(@Param('id') id: number, @Req() req: Request) {
        //@ts-ignore
        const userId = req.user.id;
        return this.articlesService.updateStatusPublished(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/archived')
    updateStatusArchived(@Param('id') id: number, @Req() req: Request) {
        //@ts-ignore
        const userId = req.user.id;
        return this.articlesService.updateStatusArchived(id, userId);
    }
}
