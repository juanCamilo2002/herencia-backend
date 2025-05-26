import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { IsEmail } from "class-validator";
import { IdentificationType } from "src/common/enums/identificationType.enum";
import { Seller } from "src/modules/sellers/entities/seller.entity";

export enum CustomerType {
    INDIVIDUAL = "individual",
    COMPANY = "company",
}

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: CustomerType
    })
    type: CustomerType;

    @Column({
        type: 'enum',
        enum: IdentificationType,
        name: 'identification_type'
    })
    identificationType: IdentificationType;

    @Column({
        unique: true,
        name: 'identification_number'
    })
    identificationNumber: string;

    @Column()
    phone: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'company_name', nullable: true })
    companyName: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => Seller, seller => seller.customers, { nullable: false})
    responsible: Seller;

    @Column({ default: true })
    status: boolean;
}
