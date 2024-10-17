import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articles } from './articles.entity';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { UpdateArticlesDto } from './dto/update-articles.dto';
import { UsersService } from '../users/users.service';
import { PublicationStatus } from 'src/config';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Articles)
        private articlesRepository: Repository<Articles>,
        private readonly usersService: UsersService,
    ) { }

    async findAll(): Promise<Articles[]> {
        return await this.articlesRepository.find({ relations: ['authors', 'media'] });
    }

    async findOne(id: number): Promise<Articles> {
        const articles = await this.articlesRepository.findOne({
            where: { id },
            relations: ['authors', 'media'],
        });

        if (!articles) {
            throw new NotFoundException(`Articles with ID ${id} not found`);
        }

        return articles;
    }

    async create(createArticlesDto: CreateArticlesDto, authorId: number): Promise<Articles[]> {
        const author = this.usersService.findOne(authorId)

        if (!author) {
            throw new NotFoundException('Author not found');
        }
        //@ts-ignore
        const newArticles = this.articlesRepository.create({
            ...createArticlesDto,
            authors: [author],
        });

        return await this.articlesRepository.save(newArticles);
    }

    async update(id: number, updateArticlesDto: UpdateArticlesDto, userId: number): Promise<Articles> {
        const article = await this.findOne(id);
        const isAuthor = article.authors.some(author => author.id === userId);

        if (!isAuthor) {
            throw new ForbiddenException('You cannot update this article because you did not write it.');
        }

        Object.assign(article, updateArticlesDto);

        return await this.articlesRepository.save(article);
    }

    async remove(id: number, userId: number): Promise<void> {
        const article = await this.findOne(id);

        const isAuthor = article.authors.some(author => author.id === userId);

        if (!isAuthor) {
            throw new ForbiddenException('You cannot delete this article because you did not write it.');
        }

        await this.articlesRepository.remove(article);
    }

    async updateStatusPublished(id: number, userId: number): Promise<Articles> {
        const article = await this.findOne(id)
        const isAuthor = article.authors.some(author => author.id === userId);

        if (!isAuthor) {
            throw new ForbiddenException('You cannot update this article because you did not write it.');
        }

        Object.assign(article, { status: PublicationStatus.PUBLISHED })

        return await this.articlesRepository.save(article)
    }

    async updateStatusArchived(id: number, userId: number): Promise<Articles> {
        const article = await this.findOne(id)
        const isAuthor = article.authors.some(author => author.id === userId);

        if (!isAuthor) {
            throw new ForbiddenException('You cannot update this article because you did not write it.');
        }

        Object.assign(article, { status: PublicationStatus.ARCHIVED })

        return await this.articlesRepository.save(article)
    }
}
