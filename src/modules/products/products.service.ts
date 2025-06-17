import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepo.find();
    if (!products || products.length === 0) {
      throw new NotFoundException('No se encontraron productos');
    }
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product> {
    const product = await this.productRepo.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return this.productRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepo.preload({ id, status: false });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    await this.productRepo.save(product);
  }
}
