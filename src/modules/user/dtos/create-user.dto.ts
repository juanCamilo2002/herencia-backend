import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { Role } from "../../../common/enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'securepassword' })
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: Role, example: Role.USER, required: false })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}