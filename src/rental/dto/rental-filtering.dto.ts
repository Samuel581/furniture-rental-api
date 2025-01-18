import { RentalStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsOptional } from "class-validator";

export class GetRentalsQueryDto{
    @IsOptional()
    @IsEnum(RentalStatus)
    status?: RentalStatus;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsInt()
    page?: number;

    @IsOptional()
    @IsInt()
    limit?: number;

}