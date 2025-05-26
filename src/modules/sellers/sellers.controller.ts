import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sellers')
@ApiBearerAuth()
@Controller('sellers')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo vendedor' })
  @ApiResponse({ status: 201, description: 'Vendedor creado exitosamente.' })
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los vendedores' })
  @ApiResponse({ status: 200, description: 'Lista de vendedores.' })
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un vendedor por ID' })
  @ApiResponse({ status: 200, description: 'Vendedor encontrado.' })
  @ApiResponse({ status: 404, description: 'Vendedor no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un vendedor' })
  @ApiResponse({ status: 200, description: 'Vendedor actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Vendedor no encontrado.' })
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un vendedor' })
  @ApiResponse({ status: 204, description: 'Vendedor eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Vendedor no encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }
}
