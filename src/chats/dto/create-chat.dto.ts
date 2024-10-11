import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty()
    @IsNumber()
    secondUserId: number;

    @IsNotEmpty()
    @IsString()
    chatName: string;
}
