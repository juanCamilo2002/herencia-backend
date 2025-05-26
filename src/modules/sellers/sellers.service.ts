import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellersService {

  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepo: Repository<Seller>,
  ) { }

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    return this.sellerRepo.save(createSellerDto);
  }

  async findAll(): Promise<Seller[]> {
    return this.sellerRepo.find();
  }

  async findOne(id: string) {
    return this.findByIdOrThrow(id);
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    const seller = await this.findByIdOrThrow(id);
    const updated = this.sellerRepo.merge(seller, updateSellerDto);
    return this.sellerRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const seller = await this.findByIdOrThrow(id);
    seller.status = false;
    await this.sellerRepo.save(seller);
  }

  private async findByIdOrThrow(id: string): Promise<Seller> {
    const seller = await this.sellerRepo.findOne({ where: { id } });
    if (!seller) {
      throw new NotFoundException(`Seller with id ${id} not found`);
    }

    return seller;
  }
}
