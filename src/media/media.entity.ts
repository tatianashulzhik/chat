import { Posts } from '../posts/posts.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    contentType: string;

    @ManyToOne(() => Posts, (post) => post.media)
    post: Posts;
}
