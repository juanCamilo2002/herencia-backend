import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { Role } from "../../../common/enums/role.enum";


export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role;
}