import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'First name and last name of client',
    example: 'Jonh Doe',
  })
  @IsString()
  @Length(3, 30)
  name: string;

  @ApiProperty({
    description: 'Phone number(s) of client',
    example: '+503 0000-0000',
  })
  @IsString({ each: true })
  phone: string[];

  @ApiProperty({
    description: 'Latitude of rental location',
    example: 10.1215231,
  })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: 'Longitude of rental location',
    example: 98.2145134,
  })
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    description: 'Address reference',
    example: 'Blue house with white gate, next to the pharmacy',
  })
  @IsString()
  @Length(10, 200)
  addressReference: string;

  @ApiPropertyOptional({
    description:
      'Notes about the client, can be a special order, or behavior to be warned of the client',
    example: 'Delayed payments in the past, confirm before new rentals',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({
    description:
      'Dictates if client client is still active or has been inactive for a considerable time, by default after creation it sets to TRUE',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
