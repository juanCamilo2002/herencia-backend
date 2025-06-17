import { IsNumber, IsUUID, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDetailDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID del producto'
    })
    @IsUUID()
    productId: string;

    @ApiProperty({
        example: 2,
        description: 'Cantidad del producto'
    })
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({
        example: 19.99,
        description: 'Precio unitario del producto'
    })
    @IsNumber()
    @Min(0)
    unitPrice: number;
}