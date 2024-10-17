import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { QuestionStatus } from '../questions-about-the-system.entity';

export class CreateQuestionDto {
    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    answer: string;

    @IsEnum(QuestionStatus)
    @IsOptional()
    status?: QuestionStatus;
}
