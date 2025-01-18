import { RentalStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsOptional } from "class-validator";

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
}