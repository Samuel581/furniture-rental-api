import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateFurnitureDto {

    @IsString()
    @Length(3, 50)
    name: string;

    @IsString()
    @IsOptional()
    color?: string;

    @IsString()
    type: string;

    @IsInt()
    @Min(0)
    stock: number;

    @IsBoolean()
    isActive: boolean;

    @IsNumber({maxDecimalPlaces: 2})
    dailyRate: number;
}
