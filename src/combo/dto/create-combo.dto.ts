import { Type } from "class-transformer";
import { ArrayMinSize, IsBoolean, IsNumber, IsString, IsUUID, Min, ValidateNested } from "class-validator";

export class ComboFurnitureItemDto {
    @IsUUID()
    furnitureId: string;

    @IsNumber()
    @Min(1)
    quantity: number;
}

export class CreateComboDto {
    @IsString()
    name: string;

    @IsNumber({maxDecimalPlaces: 2})
    dailyRate: number;

    @IsBoolean()
    isActive: boolean;

    @ValidateNested({ each: true})
    @Type(() => ComboFurnitureItemDto)
    @ArrayMinSize(1)
    furnitureItems: ComboFurnitureItemDto[]
}
