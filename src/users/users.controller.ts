import { Controller, Post, Body, Get, UsePipes, ValidationPipe, Res, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CresteUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() cresteUserDto: CresteUserDto) {
        return this.usersService.create(cresteUserDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() cresteUserDto: CresteUserDto,
        @Res({ passthrough: true }) response: Response) {
        return this.usersService.login(response, cresteUserDto);
    }

    @Get('auth')
    async auth(@Req() request: Request) {
        return this.usersService.auth(request);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        return this.usersService.logout(response);
    }
}
