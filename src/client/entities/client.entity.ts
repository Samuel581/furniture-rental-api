import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Client {
  @ApiProperty({
    description: 'Unique client identifier',
    example: 'b8a2f39d-ce57-46b7-88aa-ebacc540f311',
  })
  id: string;

  @ApiProperty({
    description: 'First name and last name of client',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Phone number(s) of client',
    type: [String],
    example: ['+503 0000-0000'],
  })
  phone: string[];

  @ApiProperty({
    description: 'Latitude of rental location',
    example: 10.1215231,
  })
  latitude: number;

  @ApiProperty({
    description: 'Longitude of rental location',
    example: -98.2145134,
  })
  longitude: number;

  @ApiProperty({
    description: 'Address reference',
    example: 'Blue house with white gate, next to the pharmacy',
  })
  addressReference: string;

  @ApiPropertyOptional({
    description:
      'Notes about the client, can be a special order, or behavior to be warned of the client',
    example: 'Delayed payments in the past, confirm before new rentals',
  })
  notes?: string;

  @ApiProperty({
    description: 'Whether the client is active',
    example: true,
  })
  isActive: boolean;
}
