import { Customer } from "src/modules/customers/entities/customer.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, Column } from "typeorm";
import { SaleDetail } from "./sale-detail.entity";
import { Seller } from "src/modules/sellers/entities/seller.entity";

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, { nullable: false, eager: true })
  customer: Customer;

  @ManyToOne(() => Seller, { nullable: false, eager: true })
  seller: Seller;

  @OneToMany(() => SaleDetail, detail => detail.sale, { cascade: true, eager: true })
  details: SaleDetail[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
