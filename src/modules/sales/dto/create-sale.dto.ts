import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsUUID, Validate, ValidateNested } from "class-validator";
import { CreateSaleDetailDto } from "./create-sale-detail.dto";
import { Type } from "class-transformer";
import { TotalMatchesDetails } from "../validators/total-matches-detail-total.validator";

export class CreateSaleDto {
    @ApiProperty({
        description: 'ID del cliente que realiza la compra',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    customerId: string;

    @ApiProperty({
        description: 'ID del vendedor que realiza la venta',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    sellerId: string;

    @ApiProperty({
        description: 'Total de la venta',
        example: 99.99,
    })
    @IsNumber()
    @Validate(TotalMatchesDetails)
    total: number;

    @ApiProperty({ type: [CreateSaleDetailDto]})
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => CreateSaleDetailDto)
    details: CreateSaleDetailDto[]

}
