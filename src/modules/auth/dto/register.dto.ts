import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class RegisterDto {
    @ApiProperty({ example: 'user@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'abc123' })
    @IsString()
    @MinLength(6)
    password: string;


    @ApiProperty({ example: 'User Name' })
    @IsString()
    name: string;

    @ApiProperty({ enum: Role, example: Role.USER, required: false })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}