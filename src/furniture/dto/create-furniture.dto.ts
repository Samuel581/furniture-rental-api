import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateFurnitureDto {

    @ApiProperty({
        description: 'Furniture name',
        example: 'Silla'
    })
    @IsString()
    @Length(3, 50)
    name: string;

    @ApiProperty({
        description: 'Color of the furniture',
        example: 'Roja'
    })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty({
        description: 'Type of furniture (for filtering)',
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

    @ApiProperty({
        description: 'Tells if a furniture is currently active or not',
        example: true
    })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @ApiProperty({
        description: 'Price for a day of rent',
        example: 1
    })
    @IsNumber({maxDecimalPlaces: 2})
    dailyRate: number;
}
