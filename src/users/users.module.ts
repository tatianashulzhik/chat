import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Roles } from '../roles/roles.entity';
import { RolesGuard } from '../guards/roles.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, Roles]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, RolesGuard],
    exports: [UsersService],
})

export class UsersModule { }
