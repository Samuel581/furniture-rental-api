import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RentalStatus } from '@prisma/client';
import { Client } from '../../client/entities/client.entity';
import { Furniture } from '../../furniture/entities/furniture.entity';
import { Combo } from '../../combo/entities/combo.entity';

export class RentalItem {
  @ApiProperty({
    description: 'Unique rental item identifier',
    example: '9a8b7c6d-5e4f-43a2-b1c0-d9e8f7a6b5c4',
  })
  id: string;

  @ApiProperty({
    description: 'Rental identifier',
    example: '7d6e5f4a-3b2c-41d0-9e8f-7a6b5c4d3e2f',
  })
  rentalId: string;

  @ApiProperty({
    description: 'Quantity rented',
    example: 2,
  })
  quantity: number;

  @ApiPropertyOptional({
    description: 'Furniture identifier (when the item is a standalone furniture)',
    example: '10c1acc1-ba55-4542-bef3-b0c782bc14b9',
  })
  furnitureId?: string;

  @ApiPropertyOptional({
    description: 'Combo identifier (when the item is a combo)',
    example: 'c1a2b3c4-d5e6-47f8-9a0b-1c2d3e4f5a6b',
  })
  comboId?: string;

  @ApiPropertyOptional({
    description: 'Furniture details (when the item is a standalone furniture)',
    type: () => Furniture,
  })
  furniture?: Furniture;

  @ApiPropertyOptional({
    description: 'Combo details (when the item is a combo)',
    type: () => Combo,
  })
  combo?: Combo;
}

export class Rental {
  @ApiProperty({
    description: 'Unique rental identifier',
    example: '7d6e5f4a-3b2c-41d0-9e8f-7a6b5c4d3e2f',
  })
  id: string;

  @ApiProperty({
    description: 'Client identifier',
    example: 'b8a2f39d-ce57-46b7-88aa-ebacc540f311',
  })
  clientId: string;

  @ApiProperty({
    description: 'Rental start date',
    type: String,
    format: 'date-time',
    example: '2026-01-01T00:00:00.000Z',
  })
  startDate: string;

  @ApiProperty({
    description: 'Rental end date',
    type: String,
    format: 'date-time',
    example: '2026-01-05T00:00:00.000Z',
  })
  endDate: string;

  @ApiProperty({
    description: 'Current rental status',
    enum: RentalStatus,
    example: RentalStatus.RESERVED,
  })
  rentalStatus: RentalStatus;

  @ApiProperty({
    description: 'Total amount of the rental (decimal serialized as string)',
    type: String,
    example: '150.00',
  })
  totalAmount: string;

  @ApiPropertyOptional({
    description: 'Deposit amount paid so far (decimal serialized as string)',
    type: String,
    example: '0.00',
  })
  depositAmount?: string;

  @ApiPropertyOptional({
    description: 'Notes about the rental',
    example: 'Deliver after 5pm',
  })
  notes?: string;

  @ApiPropertyOptional({
    description: 'Secondary delivery address',
    example: 'Apt 4B, Blue building',
  })
  secondaryDeliveryAddress?: string;

  @ApiPropertyOptional({
    description: 'Client that made the rental',
    type: () => Client,
  })
  client?: Client;

  @ApiPropertyOptional({
    description: 'Items included in the rental',
    type: () => [RentalItem],
  })
  rentalItems?: RentalItem[];
}
