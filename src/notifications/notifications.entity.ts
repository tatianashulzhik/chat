import { Users } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('notifications')
export class Notifications {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, user => user.notifications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @Column({ type: 'jsonb', default: { new: [], old: [] } })
    notifications: { new: object[], old: object[] };
}
