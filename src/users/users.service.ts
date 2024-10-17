import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CresteUserDto } from './dto/create-user.dto';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Roles } from '../roles/roles.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private readonly jwtService: JwtService,
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) { }

    async create(cresteUserDto: CresteUserDto) {
        const role = await this.rolesRepository.findOne({ where: { name: cresteUserDto.role } });

        const existUser = await this.usersRepository.findOne({
            where: {
                username: cresteUserDto.username,
            }
        })

        if (existUser) throw new BadRequestException('This username already exist!')

        const user = await this.usersRepository.save({
            username: cresteUserDto.username,
            password: await argon2.hash(cresteUserDto.password),
            role,
        });

        const { password, ...result } = user;

        return result
    }

    async login(response: Response, cresteUserDto: CresteUserDto) {
        const user = await this.usersRepository.findOne({ where: { username: cresteUserDto.username } });

        if (!user) throw new BadRequestException('Invalid credentials')

        if (!await argon2.verify(user.password, cresteUserDto.password)) throw new BadRequestException('Invalid credentials')

        const jwt = await this.jwtService.signAsync({ id: user.id })

        response.cookie('jwt', jwt, { httpOnly: true })

        return {
            message: 'success'
        }
    }

    async auth(request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verify(cookie)

            if (!data) throw new UnauthorizedException()

            const user = await this.usersRepository.findOne({ where: { id: data['id'] } });

            const { password, ...result } = user;

            return result
        }
        catch (err) {
            throw new UnauthorizedException()
        }
    }

    async logout(response: Response) {
        response.clearCookie('jwt')

        return { message: 'success' }
    }

    async findByIdWithRole(id: number): Promise<Users> {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['role'],
        });
    }

    async findOne(id: number): Promise<Users> {
        return await this.usersRepository.findOne({ where: { id } });
    }
}
