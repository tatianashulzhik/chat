import { Chats } from '../chats/chats.entity';
import { Admins } from '../admins/ admins.entity';
import { Users } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Users, (user) => user.messages)
    user: Users;

    @ManyToOne(() => Admins, (admin) => admin.messages)
    admin: Admins;

    @ManyToOne(() => Chats, (chat) => chat.messages)
    chat: Chats;
}
