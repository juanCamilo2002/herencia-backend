import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from './entities/sale-detail.entity';
import { CustomersModule } from '../customers/customers.module';
import { SellersModule } from '../sellers/sellers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Sale, SaleDetail]),
    ProductsModule,
    CustomersModule,
    SellersModule
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
