import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsBoolean, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from "class-validator";

export class ComboFurnitureItemDto {
    @IsUUID()
    furnitureId: string;

    @IsNumber()
    @Min(1)
    quantity: number;
}

export class CreateComboDto {
    @ApiProperty({
        description: "Name of the furniture combo package",
        example: "Living Room Starter Pack"
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "Daily rental rate for this combo package",
        example: 25.50
    })
    @IsNumber({maxDecimalPlaces: 2})
    dailyRate: number;

    @ApiPropertyOptional({
        description: "Indicates whether the combo is available for rental. Defaults to true when creating new combos.",
        example: true
    })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @ApiProperty({
        description: "List of furniture items included in this combo package",
        type: [ComboFurnitureItemDto],
        example: [
            {
                furnitureId: "10c1acc1-ba55-4542-bef3-b0c782bc14b9",
                quantity: 2
            }
        ]
    })
    @ValidateNested({ each: true})
    @Type(() => ComboFurnitureItemDto)
    @ArrayMinSize(1)
    furnitureItems: ComboFurnitureItemDto[]
}
