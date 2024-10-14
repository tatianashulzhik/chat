import { Controller, Post, Delete, Put, Body, Param, ParseIntPipe, Get, ValidationPipe, UsePipes, UseGuards, Req, Patch } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post(':id')
    async createMessage(@Req() req: Request, @Body() createMessageDto: CreateMessageDto, @Param('id') chatId: number) {
        // @ts-ignore
        const userId = req.user.id;
        return this.messagesService.createMessage(userId, chatId, createMessageDto);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Delete(':id')
    async deleteMessage(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        // @ts-ignore
        const userId = req.user.id;
        return this.messagesService.deleteMessage(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    async updateMessage(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMessageDto: UpdateMessageDto,
    ) {
        // @ts-ignore
        const userId = req.user.id;
        return this.messagesService.updateMessage(id, updateMessageDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('chat/:chatId')
    async getMessagesByChat(
        @Req() req: Request,
        @Param('chatId', ParseIntPipe,
        ) chatId: number) {
        // @ts-ignore
        const userId = req.user.id;
        return this.messagesService.getMessagesByChat(chatId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/read')
    async markMessageAsRead(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number
    ) {
        // @ts-ignore
        const userId = req.user.id;
        return this.messagesService.markMessageAsRead(id, userId);
    }
}
