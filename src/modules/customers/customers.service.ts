import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerType } from './entities/customer.entity';

import { SellersService } from '../sellers/sellers.service';
import { Seller } from '../sellers/entities/seller.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly sellersService: SellersService,
  ) { }

  async create(dto: CreateCustomerDto): Promise<Customer> {

    const seller = await this.loadSeller(dto.responsible);
    const customer = this.customerRepo.create({
      ...dto,
      responsible: seller,
      companyName: dto.type === CustomerType.INDIVIDUAL
        ? `${dto.firstName} ${dto.lastName}`
        : dto.companyName
    });

    return this.customerRepo.save(customer);
  }

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: string): Promise<Customer> {
    return this.findByIdOrThrow(id);
  }

  async update(id: string, dto: Partial<UpdateCustomerDto>): Promise<Customer> {
    const customer = await this.findByIdOrThrow(id);

    const seller = dto.responsible ? await this.loadSeller(dto.responsible) : customer.responsible;

    const updated = this.customerRepo.merge(customer, {
      ...dto,
      responsible: seller,
      companyName: dto.type === CustomerType.INDIVIDUAL
        ? `${dto.firstName || customer.firstName} ${dto.lastName || customer.lastName}`
        : dto.companyName ?? customer.companyName,
    });

    return this.customerRepo.save(updated);
  }

  async remove(id: string) {
    const customer = await this.findByIdOrThrow(id);
    customer.status = false;
    await this.customerRepo.save(customer);
  }

  private async findByIdOrThrow(id: string): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  private async loadSeller(id: string): Promise<Seller> {
    return this.sellersService.findOne(id);
  }
}