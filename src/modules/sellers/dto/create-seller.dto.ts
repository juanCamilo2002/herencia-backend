import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsString } from "class-validator";
import { IdentificationType } from "src/common/enums/identificationType.enum";

export class CreateSellerDto {
    @ApiProperty({ example: 'John' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Doe' })
    @IsString()
    lastName: string;

    @ApiProperty({ enum: IdentificationType, example: IdentificationType.CC })
    @IsEnum(IdentificationType)
    identificationType: IdentificationType; 

    @ApiProperty({ example: '123456789' })
    @IsString()
    identificationNumber: string;

    @ApiProperty({ example: '1234567890' })
    @IsString()
    phone: string;

    @ApiProperty({ example: 'jhondoe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123 Main St' })
    @IsString()
    address: string;

    @ApiProperty({ example: 'New York' })
    @IsString()
    city: string;
}
