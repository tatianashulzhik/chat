import { Controller, Post, Delete, Param, Body, UseGuards, Req, ParseIntPipe, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { RoleType } from '../roles/roles.entity';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { RenameChatDto } from './dto/rename-chat.dto';

@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) { }

    @Roles(RoleType.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe())
    @Post('create-group')
    async createGroupChat(@Req() req: Request, @Body() createChatDto: CreateChatDto) {
        // @ts-ignore
        const creatorId = req.user.id;
        return this.chatsService.createGroupChat(creatorId, createChatDto);
    }

    @Roles(RoleType.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteChat(@Req() req: Request, @Param('id', ParseIntPipe) chatId: number) {
        // @ts-ignore
        const userId = req.user.id;
        return this.chatsService.deleteChat(userId, chatId);
    }

    @Roles(RoleType.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id/rename')
    @UsePipes(new ValidationPipe())
    async renameChat(
        @Req() req: Request,
        @Param('id', ParseIntPipe) chatId: number,
        @Body() renameChatDto: RenameChatDto,
    ) {
        // @ts-ignore
        const userId = req.user.id;
        return this.chatsService.renameChat(userId, chatId, renameChatDto);
    }
}
