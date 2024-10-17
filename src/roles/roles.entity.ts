import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RoleType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: RoleType,
        default: RoleType.USER,
    })
    name: RoleType;
}
