import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum QuestionStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
}

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    question: string;

    @Column({ type: 'text' })
    answer: string;

    @Column({
        type: 'enum',
        enum: QuestionStatus,
        default: QuestionStatus.DRAFT,
    })
    status: QuestionStatus;
}
