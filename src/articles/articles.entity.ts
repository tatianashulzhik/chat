import { Users } from '../users/users.entity';
import { Media } from '../media/media.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PublicationStatus } from '../config';

@Entity()
export class Articles {
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

    @Column('text', { nullable: true })
    link?: string;

    @Column('text', { nullable: true })
    author?: string;

    @OneToMany(() => Media, (media) => media.post)
    media: Media[];

    @ManyToMany(() => Users, (user) => user.posts)
    @JoinTable()
    authors: Users[];
}
