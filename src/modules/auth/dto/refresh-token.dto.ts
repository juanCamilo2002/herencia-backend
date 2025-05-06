import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResfreshTokenDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'})
    @IsString()
    refresh_token: string;
}