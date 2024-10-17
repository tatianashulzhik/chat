import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PublicationStatus } from '../config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
        private readonly usersService: UsersService,
    ) { }

    async findAll(): Promise<Posts[]> {
        return await this.postsRepository.find({ relations: ['authors', 'media'] });
    }

    async findOne(id: number): Promise<Posts> {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['authors', 'media'],
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return post;
    }

    async create(createPostDto: CreatePostDto, authorId: number): Promise<Posts[]> {
        const author = this.usersService.findOne(authorId)

        if (!author) {
            throw new NotFoundException('Author not found');
        }
        //@ts-ignore
        const newPost = this.postsRepository.create({
            ...createPostDto,
            authors: [author],
        });

        return await this.postsRepository.save(newPost);
    }

    async update(id: number, updatePostDto: UpdatePostDto, userId: number): Promise<Posts> {
        const post = await this.findOne(id);

        const isAuthor = post.authors.some(author => author.id === userId);

        if (!isAuthor) {
            throw new ForbiddenException('You cannot update this post because you did not write it.');
        }

        Object.assign(post, updatePostDto);

        return await this.postsRepository.save(post);
    }

    async remove(id: number, userId: number): Promise<void> {
        const post = await this.findOne(id);

        const isAuthor = post.authors.some(author => author.id === userId);

        if (!isAuthor) {
            throw new ForbiddenException('You cannot update this post because you did not write it.');
        }

        await this.postsRepository.remove(post);
    }

    async updateStatusPublished(id: number, userId: number): Promise<Posts> {
        const post = await this.findOne(id)

        const isAuthor = post.authors.some(author => author.id === userId);

        if (!isAuthor) {
            throw new ForbiddenException('You cannot update this post because you did not write it.');
        }

        Object.assign(post, { status: PublicationStatus.PUBLISHED })

        return await this.postsRepository.save(post)
    }

    async updateStatusArchived(id: number, userId: number): Promise<Posts> {
        const post = await this.findOne(id)

        const isAuthor = post.authors.some(author => author.id === userId);

        if (!isAuthor) {
            throw new ForbiddenException('You cannot update this post because you did not write it.');
        }

        Object.assign(post, { status: PublicationStatus.ARCHIVED })

        return await this.postsRepository.save(post)
    }
}
