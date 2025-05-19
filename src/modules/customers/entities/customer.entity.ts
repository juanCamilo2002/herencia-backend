import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { IsEmail } from "class-validator";

export enum CustomerType {
    INDIVIDUAL = "individual",
    COMPANY = "company",
}

export enum IdentificationType {
    CC = "CC",
    NIT = "NIT",
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

    // @ManyToOne(() => Seller, seller => seller.customers)
    // responsible: Seller;

    @Column({ default: true })
    status: boolean;
}
