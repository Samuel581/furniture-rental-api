import { ApiProperty } from '@nestjs/swagger';

export class ReportRentalsCountDto {
  @ApiProperty({
    description: 'Total number of rentals in the period',
    example: 42,
  })
  totalRentals: number;
}

export class ReportTotalGainsDto {
  @ApiProperty({
    description: 'Sum of rental totalAmount in the period (decimal serialized as string)',
    type: String,
    example: '1500.00',
  })
  totalGains: string;
}

/**
 * The best-clients query only loads these four client fields.
 * Do not use the full Client schema here: it marks latitude, longitude and
 * isActive as required, which this endpoint does not return.
 */
export class TopClientSummaryDto {
  @ApiProperty({
    description: 'Client identifier',
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
    description: 'Address reference',
    example: 'Blue house with white gate, next to the pharmacy',
  })
  addressReference: string;
}

export class ReportTopClientDto {
  @ApiProperty({
    description: 'Client summary',
    type: () => TopClientSummaryDto,
  })
  client: TopClientSummaryDto;

  @ApiProperty({
    description: 'Total amount spent by the client (decimal serialized as string)',
    type: String,
    example: '500.00',
  })
  totalSpent: string;

  @ApiProperty({
    description: 'Number of completed rentals',
    example: 5,
  })
  rentalCount: number;
}
