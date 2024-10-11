import { IsString, MinLength } from 'class-validator';
import { RoleType } from '../../roles/roles.entity';

export class CresteUserDto {
    @IsString()
    username: string;

    @MinLength(6, { message: 'Password must contain at least 6 symbols' })
    password: string;

    @IsString()
    role: RoleType;
}
