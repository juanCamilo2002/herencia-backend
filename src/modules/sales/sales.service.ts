import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { DataSource, Repository } from 'typeorm';
import { SaleDetail } from './entities/sale-detail.entity';
import { ProductsService } from '../products/products.service';
import { CustomersService } from '../customers/customers.service';
import { SellersService } from '../sellers/sellers.service';

@Injectable()
export class SalesService {

  constructor(
    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(SaleDetail)
    private readonly saleDetailRepo: Repository<SaleDetail>,

    private readonly productsService: ProductsService,

    private readonly customersService: CustomersService,

    private readonly sellersService: SellersService,

    private readonly dataSource: DataSource
  ) { }

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const { customerId, sellerId, total, details } = createSaleDto;

    const customer = await this.customersService.findOne(customerId);
    const seller = await this.sellersService.findOne(sellerId);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const sale = this.saleRepo.create({ customer, seller, total });

      const savedSale = await queryRunner.manager.save(sale);

      const detailEntities = await this.buildSaleDetails(savedSale, details);
      await queryRunner.manager.save(SaleDetail, detailEntities);

      await queryRunner.commitTransaction();
      return savedSale;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.saleRepo.find({ where: { status: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }

  private async buildSaleDetails(
    sale: Sale,
    details: CreateSaleDto['details']
  ): Promise<SaleDetail[]> {
    return Promise.all(
      details.map(async (item) => {
        const product = await this.productsService.findOne(item.productId);
        return this.saleDetailRepo.create({
          sale,
          product,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        });
      })
    );
  }
}
