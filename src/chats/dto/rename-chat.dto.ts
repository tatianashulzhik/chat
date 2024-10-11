import { IsNotEmpty, IsString } from "class-validator";

export class RenameChatDto {
    @IsNotEmpty()
    @IsString()
    chatName: string;
}
