import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Min } from "class-validator";


enum SortOrder{
    ASC = 'asc',
    DESC = 'desc'
}

export class GetFurnituresQueryDto{
    @IsOptional()
    type?: string;

    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(() => Number)
    minStock?: number;
    
    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(() => Number)
    maxStock?: number;

    @IsOptional()
    @IsEnum(SortOrder)
    orderBy?: SortOrder;

    @IsOptional()
    sortBy?: 'type' | 'stock' | 'dailyRate'

    @IsOptional()
    @IsInt()
    page?: number;

    @IsOptional()
    @IsInt()
    limit?: number;
}
