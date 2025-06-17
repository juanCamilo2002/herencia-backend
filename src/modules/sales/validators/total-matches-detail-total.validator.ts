import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { CreateSaleDetailDto } from "../dto/create-sale-detail.dto";

@ValidatorConstraint({ name: 'TotalMatchesDetails', async: false })
export class TotalMatchesDetails implements ValidatorConstraintInterface {
    validate(total: any, args: ValidationArguments) {
        const object = args.object as any;
        const details: CreateSaleDetailDto[] = object.details;

        if (!Array.isArray(details)) return false;

        const calculatedTotal = details.reduce((sum, item) => {
            return sum + item.quantity * item.unitPrice;
        }, 0);

        return Math.abs(calculatedTotal - total) < 0.01;
    }

    defaultMessage(args?: ValidationArguments): string {
        return `El total no coincide con la suma de los detalles`;
    }
}