import { IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { MONTH } from '../report.service';

export class ReportQueryDateDto {
  @IsOptional()
  @IsEnum(MONTH)
  @Transform(({ value }) => parseInt(value))
  month?: MONTH;

  @IsOptional()
  @IsInt()
  @Min(2020)
  @Max(2030)
  @Transform(({ value }) => parseInt(value))
  year?: number;
}
