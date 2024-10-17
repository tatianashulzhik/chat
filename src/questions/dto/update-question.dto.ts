import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { QuestionStatus } from '../questions-about-the-system.entity';

export class UpdateQuestionDto {
  @IsOptional()
  @IsNotEmpty()
  question?: string;

  @IsOptional()
  @IsNotEmpty()
  answer?: string;

  @IsEnum(QuestionStatus)
  @IsOptional()
  status?: QuestionStatus;
}
