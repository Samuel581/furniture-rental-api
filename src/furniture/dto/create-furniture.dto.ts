import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateFurnitureDto {

    @ApiProperty({
        description: 'Furniture name',
        example: 'Wood outsite chair'
    })
    @IsString()
    @Length(3, 50)
    name: string;

    @ApiProperty({
        description: "Furniture's color",
        example: 'Red Wood'
    })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty({
        description: "Furniture's type",
        example: 'Silla'
    })
    @IsString()
    type: string;

    @ApiProperty({
        description: 'Total stock aviable',
        example: 25
    })
    @IsInt()
    @Min(0)
    stock: number;

    @ApiPropertyOptional({
        description: 'Indicates whether the furniture item is available for rental. Defaults to true when creating new items.',
        example: true
    })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @ApiProperty({
        description: 'Price for a day of rent, can be an integer or float point',
        example: 1
    })
    @IsNumber({maxDecimalPlaces: 2})
    dailyRate: number;
}
