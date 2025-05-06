import { IsString } from "class-validator";

export class ResfreshTokenDto {
    @IsString()
    refresh_token: string;
}