import { Posts } from '../posts/posts.entity';
import { Articles } from '../articles/articles.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    contentType: string;

    @ManyToOne(() => Posts, (post) => post.media, { nullable: true })
    post?: Posts;

    @ManyToOne(() => Articles, (article) => article.media, { nullable: true })
    article?: Articles;
}
