import { Chats } from '../chats/chats.entity';
import { Users } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => Users, (user) => user.messages)
    user: Users;

    @ManyToOne(() => Chats, (chat) => chat.messages)
    chat: Chats;

    @ManyToMany(() => Users, (user) => user.readMessages)
    @JoinTable({
        name: 'messages_users_statuses',
        joinColumn: { name: 'messageId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    readers: Users[];
}
