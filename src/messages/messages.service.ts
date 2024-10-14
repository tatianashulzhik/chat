import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from './messages.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Users } from '../users/users.entity';
import { Chats } from '../chats/chats.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Messages)
        private messagesRepository: Repository<Messages>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Chats)
        private chatsRepository: Repository<Chats>,
    ) { }

    async createMessage(userId: number, chatId: number, createMessageDto: CreateMessageDto) {
        const existingChat = await this.chatsRepository.findOne({
            where: { id: chatId },
            relations: ['participants'],
        });

        if (!existingChat) {
            throw new NotFoundException('Chat not found');
        }

        const isParticipant = existingChat.participants.some(participant => participant.id === userId);

        if (!isParticipant) {
            throw new ForbiddenException('You are not a participant in this chat');
        }

        const { content } = createMessageDto;

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const newMessage = this.messagesRepository.create({
            content,
            user,
            chat: existingChat,
        });


        return await this.messagesRepository.save(newMessage);
    }


    async deleteMessage(id: number, userId: number): Promise<void> {
        const message = await this.messagesRepository.findOne({ where: { id }, relations: ['user'] });

        if (!message) {
            throw new NotFoundException(`Сообщение с ID ${id} не найдено`);
        }

        if (message.user.id !== userId) {
            throw new ForbiddenException('Вы не можете удалить это сообщение, так как не являетесь его автором');
        }

        await this.messagesRepository.remove(message);
    }

    async updateMessage(id: number, updateMessageDto: UpdateMessageDto, userId: number): Promise<Messages> {
        const message = await this.messagesRepository.findOne({ where: { id }, relations: ['user'] });
        if (!message) {
            throw new NotFoundException(`Message with ID ${id} not found`);
        }
        if (message.user.id !== userId) {
            throw new ForbiddenException('Вы не можете изменить это сообщение, так как не являетесь его автором');
        }

        message.content = updateMessageDto.content;
        return this.messagesRepository.save(message);
    }

    async getMessagesByChat(chatId: number, userId: number): Promise<Messages[]> {
        const chat = await this.chatsRepository.findOne({
            where: { id: chatId },
            relations: ['participants'],
        });

        if (!chat) {
            throw new NotFoundException('Чат не найден');
        }

        const isParticipant = chat.participants.some(participant => participant.id === userId);

        if (!isParticipant) {
            throw new ForbiddenException('Вы не являетесь участником этого чата');
        }

        return this.messagesRepository.find({
            where: { chat: { id: chatId } },
            relations: ['user', 'chat'],
        });
    }

    async markMessageAsRead(messageId: number, userId: number): Promise<Messages> {
        const message = await this.messagesRepository.findOne({
            where: { id: messageId },
            relations: ['chat', 'chat.participants', 'user', 'readers'],
        });

        if (!message) {
            throw new NotFoundException(`Message with ID ${messageId} not found`);
        }

        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['readMessages'],
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const isParticipant = message.chat.participants.some(participant => participant.id === userId);
        if (!isParticipant) {
            throw new ForbiddenException('Вы не являетесь участником этого чата');
        }

        if (message.user.id === userId) {
            throw new ForbiddenException('Вы не можете пометить свое сообщение как прочитанное');
        }

        if (!message.readers.some(reader => reader.id === userId)) {
            message.readers.push(user);
        }

        return this.messagesRepository.save(message);
    }
}
