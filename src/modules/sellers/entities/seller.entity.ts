import { IdentificationType } from "src/common/enums/identificationType.enum";
import { Customer } from "src/modules/customers/entities/customer.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity('sellers')
export class Seller {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column({
        type: 'enum',
        enum: IdentificationType,
        name: 'identification_type'
    })
    identificationType: IdentificationType

    @Column({ unique: true})
    identificationNumber: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => Customer,  customer => customer.responsible)
    customers: Customer[];
}
