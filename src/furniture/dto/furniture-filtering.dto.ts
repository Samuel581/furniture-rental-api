import { Type, Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, Min } from "class-validator";


export enum SortOrder{
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

    @ApiPropertyOptional({
        description: 'Field used to sort the results',
        enum: ['type', 'stock', 'dailyRate'],
        example: 'stock',
    })
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
