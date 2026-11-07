import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Furniture {
  @ApiProperty({
    description: 'Unique furniture identifier',
    example: '10c1acc1-ba55-4542-bef3-b0c782bc14b9',
  })
  id: string;

  @ApiProperty({
    description: 'Furniture name',
    example: 'Wood outside chair',
  })
  name: string;

  @ApiPropertyOptional({
    description: "Furniture's color",
    example: 'Red Wood',
  })
  color?: string;

  @ApiProperty({
    description: "Furniture's type",
    example: 'Chair',
  })
  type: string;

  @ApiProperty({
    description: 'Total stock available',
    example: 25,
  })
  stock: number;

  @ApiProperty({
    description: 'Price for a day of rent (decimal serialized as string)',
    type: String,
    example: '10.50',
  })
  dailyRate: string;

  @ApiProperty({
    description: 'Whether the furniture item is available for rental',
    example: true,
  })
  isActive: boolean;
}
