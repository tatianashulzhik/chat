import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChatDto {
        @IsNotEmpty()
        @IsString()
        chatName: string;

        @IsArray()
        @IsNumber({}, { each: true })
        participantIds: number[];

}
