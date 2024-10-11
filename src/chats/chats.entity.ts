import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Messages } from '../messages/messages.entity';
import { Users } from '../users/users.entity';

@Entity()
export class Chats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Users, (user) => user.createdChats)
    creator: Users;

    @ManyToOne(() => Users, (user) => user.participatingChats)
    secondUser: Users;

    @OneToMany(() => Messages, (message) => message.chat)
    messages: Messages[];
}
