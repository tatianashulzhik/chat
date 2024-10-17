import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Messages } from '../messages/messages.entity';
import { Users } from '../users/users.entity';

@Entity()
export class Chats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Users, (user) => user.participatingChats)
    @JoinTable()
    participants: Users[];

    @OneToMany(() => Messages, (message) => message.chat)
    messages: Messages[];
}
