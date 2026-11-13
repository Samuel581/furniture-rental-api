import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayMinSize, IsDate, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from "class-validator";

export class CreateItemRentalDTO {
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsUUID()
    @IsOptional()
    furnitureId?: string;

    @IsUUID()
    @IsOptional()
    comboId?: string;
}


export class CreateRentalDto {
    @IsUUID()
    clientId: string;

    @ApiProperty({
        description: 'Rental start date',
        type: String,
        format: 'date-time',
        example: '2026-01-01T00:00:00.000Z',
    })
    @Type(() => Date)
    @IsDate()
    startDate: string;

    @ApiProperty({
        description: 'Rental end date',
        type: String,
        format: 'date-time',
        example: '2026-01-05T00:00:00.000Z',
    })
    @Type(() => Date)
    @IsDate()
    endDate: string;

    @ApiPropertyOptional({
        description: 'Deposit amount to pay upfront',
        example: 50,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    depositAmount?: number;

    @ApiPropertyOptional({
        description: 'Notes about the rental',
        example: 'Deliver after 5pm',
    })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiPropertyOptional({
        description: 'Secondary delivery address',
        example: 'Apt 4B, Blue building',
    })
    @IsString()
    @IsOptional()
    secondaryDeliveryAddress?: string;

    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CreateItemRentalDTO)
    items: CreateItemRentalDTO[];
}
