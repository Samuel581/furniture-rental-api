import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Furniture } from '../../furniture/entities/furniture.entity';

export class ComboFurniture {
  @ApiProperty({
    description: 'Unique combo-furniture link identifier',
    example: '5f1c2d3e-4a5b-6c7d-8e9f-0a1b2c3d4e5f',
  })
  id: string;

  @ApiProperty({
    description: 'Quantity of this furniture included in the combo',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'Combo identifier',
    example: 'c1a2b3c4-d5e6-47f8-9a0b-1c2d3e4f5a6b',
  })
  comboId: string;

  @ApiProperty({
    description: 'Furniture identifier',
    example: '10c1acc1-ba55-4542-bef3-b0c782bc14b9',
  })
  furnitureId: string;

  @ApiPropertyOptional({
    description: 'Furniture included in the combo',
    type: () => Furniture,
  })
  furniture?: Furniture;
}

export class Combo {
  @ApiProperty({
    description: 'Unique combo identifier',
    example: 'c1a2b3c4-d5e6-47f8-9a0b-1c2d3e4f5a6b',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the furniture combo package',
    example: 'Living Room Starter Pack',
  })
  name: string;

  @ApiProperty({
    description: 'Daily rental rate for this combo package',
    example: 25.5,
  })
  dailyRate: number;

  @ApiProperty({
    description: 'Whether the combo is available for rental',
    example: true,
  })
  isActive: boolean;

  @ApiPropertyOptional({
    description: 'Furniture items that make up the combo',
    type: () => [ComboFurniture],
  })
  ComboFurniture?: ComboFurniture[];
}
