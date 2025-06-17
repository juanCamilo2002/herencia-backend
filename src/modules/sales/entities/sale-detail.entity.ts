import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Sale } from "./sale.entity";
import { Product } from "src/modules/products/entities/product.entity";

@Entity('sale_details')
export class SaleDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Sale, sale => sale.details, { onDelete: 'CASCADE' })
    sale: Sale;

    @ManyToOne(() => Product, { eager: true })
    product: Product;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unitPrice: number;
}