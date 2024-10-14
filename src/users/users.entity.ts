import { Roles } from '../roles/roles.entity';
import { Messages } from '../messages/messages.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Chats } from '../chats/chats.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToMany(() => Chats, (chat) => chat.participants)
    participatingChats: Chats[];

    @OneToMany(() => Messages, (message) => message.user)
    messages: Messages[];

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @ManyToOne(() => Roles, { eager: true })
    role: Roles;
}
