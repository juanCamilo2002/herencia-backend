import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role;
}