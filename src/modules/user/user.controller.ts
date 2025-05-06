import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }
}
