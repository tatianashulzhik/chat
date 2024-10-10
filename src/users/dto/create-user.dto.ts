import { IsString, MinLength } from 'class-validator';

export class CresteUserDto {
    @IsString()
    username: string;

    @MinLength(6, { message: 'Password must ne more then 6 symbols' })
    password: string;
}
