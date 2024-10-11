import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chats } from './chats.entity';
import { Users } from '../users/users.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { RenameChatDto } from './dto/rename-chat.dto';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chats)
        private readonly chatsRepository: Repository<Chats>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) { }

    async createChat(creatorId: number, createChatDto: CreateChatDto) {
        const { secondUserId, chatName } = createChatDto;

        const creator = await this.usersRepository.findOne({ where: { id: creatorId } });

        if (!secondUserId) {
            throw new NotFoundException('Необходимо указать ID второго пользователя для создания чата');
        }

        if (creatorId === secondUserId) {
            throw new BadRequestException('Невозможно создать чат с самим собой');
        }

        const secondUser = await this.usersRepository.findOne({ where: { id: secondUserId } });

        if (!creator || !secondUser) {
            throw new NotFoundException('Пользователь не найден');
        }

        const existingChat = await this.chatsRepository.findOne({
            where: [
                { creator: { id: creator.id }, secondUser: { id: secondUser.id }, name: chatName },
                { creator: { id: secondUser.id }, secondUser: { id: creator.id }, name: chatName }
            ],
        });

        if (existingChat) {
            throw new BadRequestException('Чат с таким же именем между этими пользователями уже существует');
        }

        const chat = this.chatsRepository.create({
            name: chatName,
            creator: creator,
            secondUser: secondUser,
            messages: [],
        });

        const savedChat = await this.chatsRepository.save(chat);

        return savedChat;
    }

    async deleteChat(userId: number, chatId: number) {
        const chat = await this.chatsRepository.findOne({
            where: { id: chatId }, relations: ['creator']
        });

        if (!chat) {
            throw new NotFoundException('Чат не найден');
        }

        if (chat.creator.id !== userId) {
            throw new ForbiddenException('У вас нет прав на удаление этого чата');
        }

        await this.chatsRepository.remove(chat);

        return {
            message: 'success'
        }
    }

    async renameChat(chatId: number, renameChatDto: RenameChatDto): Promise<Chats> {
        const chat = await this.chatsRepository.findOne({ where: { id: chatId } });

        if (!chat) {
            throw new NotFoundException(`Chat with ID ${chatId} not found`);
        }

        chat.name = renameChatDto.chatName;

        return await this.chatsRepository.save(chat);
    }
}
