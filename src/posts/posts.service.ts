import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts, PublicationStatus } from './posts.entity';
import { Users } from '../users/users.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
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
        const author = await this.usersRepository.findOne({ where: { id: authorId } });

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

    async update(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
        const post = await this.findOne(id);

        Object.assign(post, updatePostDto);

        return await this.postsRepository.save(post);
    }

    async remove(id: number): Promise<void> {
        const post = await this.findOne(id);
        await this.postsRepository.remove(post);
    }

    async updateStatusPublished(id: number): Promise<Posts> {
        const post = await this.findOne(id)
        Object.assign(post, { status: PublicationStatus.PUBLISHED })
        return await this.postsRepository.save(post)
    }

    async updateStatusArchived(id: number): Promise<Posts> {
        const post = await this.findOne(id)
        Object.assign(post, { status: PublicationStatus.ARCHIVED })
        return await this.postsRepository.save(post)
    }
}
