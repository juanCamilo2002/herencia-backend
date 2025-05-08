import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Roles(Role.ADMIN)
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Roles(Role.ADMIN)
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll() {
        return this.userService.findAll();
    }

    @Roles(Role.ADMIN)
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener un usuario por su ID' })
    async findOne(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar usuario' })
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar un usuario' })
    async remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

}
