import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Roles(Role.ADMIN)
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }
}
