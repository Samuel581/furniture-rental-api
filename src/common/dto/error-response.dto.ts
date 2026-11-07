import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message(s)',
    example: 'Client with id b8a2f39d-ce57-46b7-88aa-ebacc540f311 not found',
  })
  message: string | string[];

  @ApiProperty({
    description: 'Short error name',
    example: 'Not Found',
  })
  error: string;
}
