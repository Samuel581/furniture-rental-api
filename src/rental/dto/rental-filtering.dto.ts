import { RentalStatus } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt, IsOptional } from "class-validator";

export class GetRentalsQueryDto{
    @ApiPropertyOptional({
        description: 'Filter rentals by status',
        enum: RentalStatus,
        example: RentalStatus.RESERVED,
    })
    @IsOptional()
    @IsEnum(RentalStatus)
    status?: RentalStatus;

    @ApiPropertyOptional({
        description: 'Only include rentals starting on or after this date',
        type: String,
        format: 'date',
        example: '2026-01-01',
    })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiPropertyOptional({
        description: 'Only include rentals ending on or before this date',
        type: String,
        format: 'date',
        example: '2026-01-31',
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiPropertyOptional({
        description: 'Page number (0-based)',
        example: 0,
    })
    @IsOptional()
    @IsInt()
    page?: number;

    @ApiPropertyOptional({
        description: 'Page size',
        example: 10,
    })
    @IsOptional()
    @IsInt()
    limit?: number;

}
