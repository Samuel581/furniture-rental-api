import { Type } from "class-transformer";
import { ArrayMinSize, IsDate, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from "class-validator";

export class CreateItemRentalDTO {
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsUUID()
    @IsOptional()
    furnitureId?: string;

    @IsUUID()
    @IsOptional()
    comboId?: string;
}


export class CreateRentalDto {
    @IsUUID()
    clientId: string;

    @IsDate()
    startDate: string;

    @IsDate()
    endDate: string;

    @IsNumber()
    @Min(0)
    depositAmount: number;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsString()
    @IsOptional()
    secondaryDeliveryAddress?: string;

    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CreateItemRentalDTO)
    items: CreateItemRentalDTO[];
}
