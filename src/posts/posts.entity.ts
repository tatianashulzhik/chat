import { Users } from '../users/users.entity';
import { Media } from '../media/media.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PublicationStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived'
}

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({
        type: 'enum',
        enum: PublicationStatus,
        default: PublicationStatus.DRAFT,
    })
    status: PublicationStatus;

    @OneToMany(() => Media, (media) => media.post)
    media: Media[];

    @ManyToMany(() => Users, (user) => user.posts)
    @JoinTable()
    authors: Users[];
}
