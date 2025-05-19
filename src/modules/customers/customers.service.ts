import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, CustomerType } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) { }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepo.create(dto);
    const fullName = `${dto.firstName} ${dto.lastName}`;

    if(dto.type === CustomerType.INDIVIDUAL) {
      customer.companyName = fullName;
    }

    return this.customerRepo.save(customer);
  }

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepo.preload({
      id,
      ...dto,
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    return this.customerRepo.save(customer);
  }

  async remove(id: string) {
    const customer = await this.customerRepo.preload({ id, status: false });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    await this.customerRepo.save(customer);
  }
}
