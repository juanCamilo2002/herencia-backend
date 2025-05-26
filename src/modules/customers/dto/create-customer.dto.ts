import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateIf, IsUUID } from "class-validator";
import { CustomerType } from "../entities/customer.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IdentificationType } from "src/common/enums/identificationType.enum";

export class CreateCustomerDto {
    @ApiProperty({ enum: CustomerType, example: CustomerType.INDIVIDUAL })
    @IsEnum(CustomerType)
    type: CustomerType;

    @ApiProperty({ enum: IdentificationType, example: IdentificationType.CC })
    @IsEnum(IdentificationType)
    identificationType: IdentificationType;

    @ApiProperty({ example: '123456789' })
    @IsNotEmpty()
    @IsString()
    identificationNumber: string;

    @ApiProperty({ example: '1234567890' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ example: 'tucorre@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John' })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ example: 'Company Name', required: false })
    @ValidateIf(o => o.type === CustomerType.COMPANY)
    @IsNotEmpty({message: 'Company name is required for company type'})
    companyName?: string;

    @ApiProperty({ example: '123 Main St' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ example: 'New York' })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ 
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID del vendedor responsable'
     })
    @IsUUID()
    responsible: string;
}
