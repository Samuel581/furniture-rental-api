import { Type, Transform } from "class-transformer";
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

    @Transform(({value}) => parseInt(value))
    @IsOptional()
    @IsInt()
    page?: number;

    @Transform(({value}) => parseInt(value))
    @IsOptional()
    @IsInt()
    limit?: number;
}
