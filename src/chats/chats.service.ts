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

    async createGroupChat(creatorId: number, createChatDto: CreateChatDto) {
        const { participantIds, chatName } = createChatDto;

        const creator = await this.usersRepository.findOne({ where: { id: creatorId } });

        if (!creator) {
            throw new NotFoundException('Создатель чата не найден');
        }

        if (!participantIds || participantIds.length === 0) {
            throw new BadRequestException('Необходимо указать хотя бы одного участника');
        }

        const uniqueParticipantIds = participantIds.filter(id => id !== creatorId);

        const participants = await this.usersRepository.findByIds(uniqueParticipantIds);

        if (participants.length !== uniqueParticipantIds.length) {
            throw new NotFoundException('Один или несколько участников не найдены');
        }

        const chat = this.chatsRepository.create({
            name: chatName,
            participants: [creator, ...participants],
            messages: [],
        });

        const savedChat = await this.chatsRepository.save(chat);

        return savedChat;
    }

    async deleteChat(userId: number, chatId: number) {
        const chat = await this.chatsRepository.findOne({
            where: { id: chatId },
            relations: ['participants'],
        });

        if (!chat) {
            throw new NotFoundException('Чат не найден');
        }

        const creator = chat.participants[0];
        if (creator.id !== userId) {
            throw new ForbiddenException('У вас нет прав на удаление этого чата');
        }

        await this.chatsRepository.remove(chat);

        return {
            message: 'success'
        }
    }

    async renameChat(userId: number, chatId: number, renameChatDto: RenameChatDto) {
        const chat = await this.chatsRepository.findOne({
            where: { id: chatId },
            relations: ['participants'],
        });

        if (!chat) {
            throw new NotFoundException('Чат не найден');
        }

        const creator = chat.participants[0];
        if (creator.id !== userId) {
            throw new ForbiddenException('У вас нет прав на переименование этого чата');
        }

        chat.name = renameChatDto.chatName;

        return await this.chatsRepository.save(chat);
    }
}
