import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-questions.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
    ) { }

    findAll(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    async findOne(id: number): Promise<Question> {
        const question = await this.questionRepository.findOneBy({ id });
        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }
        return question;
    }

    create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question = this.questionRepository.create(createQuestionDto);
        return this.questionRepository.save(question);
    }

    async update(
        id: number,
        updateQuestionDto: UpdateQuestionDto,
    ): Promise<Question> {
        const question = await this.findOne(id);
        Object.assign(question, updateQuestionDto);
        return this.questionRepository.save(question);
    }

    async remove(id: number): Promise<void> {
        const result = await this.questionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }
    }
}
