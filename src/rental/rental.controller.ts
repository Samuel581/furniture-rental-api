import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, ParseFloatPipe, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { GetRentalsQueryDto } from './dto/rental-filtering.dto';
import { Rental } from './entities/rental.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

const rentalIdParam = {
  name: 'id',
  type: String,
  format: 'uuid',
  example: '7d6e5f4a-3b2c-41d0-9e8f-7a6b5c4d3e2f',
  description: 'Rental ID',
};

const clientIdParam = {
  name: 'clientId',
  type: String,
  format: 'uuid',
  example: 'b8a2f39d-ce57-46b7-88aa-ebacc540f311',
  description: 'Client ID',
};

const amountParam = {
  name: 'amount',
  type: Number,
  example: 50.0,
  description: 'Deposit amount to add',
};

@ApiTags('rental')
@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a rental order' })
  @ApiCreatedResponse({ description: 'Rental created', type: Rental })
  @ApiResponse({ status: 400, description: 'Validation or stock/business-rule error', type: ErrorResponseDto })
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get rentals (optionally filtered by status/date)' })
  @ApiOkResponse({ description: 'List of rentals', type: [Rental] })
  findAllActive(@Query() query: GetRentalsQueryDto) {
    return this.rentalService.findAllNotCancelled(query);
  }

  @Get('/client/:clientId')
  @ApiOperation({ summary: 'Get all rentals for a client' })
  @ApiParam(clientIdParam)
  @ApiOkResponse({ description: 'List of the client rentals', type: [Rental] })
  findByClientId(@Param('clientId', ParseUUIDPipe) clientId: string){
    return this.rentalService.findManyByClientId(clientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rental by ID' })
  @ApiParam(rentalIdParam)
  @ApiOkResponse({ description: 'Rental found', type: Rental })
  @ApiResponse({ status: 404, description: 'Rental not found', type: ErrorResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentalService.findOne(id);
  }

  @Patch(':id/deliver')
  @ApiOperation({ summary: 'Mark a rental as delivered' })
  @ApiParam(rentalIdParam)
  @ApiOkResponse({ description: 'Rental delivered', type: Rental })
  @ApiResponse({ status: 404, description: 'Rental not found', type: ErrorResponseDto })
  deliver(@Param('id', ParseUUIDPipe) id: string,) {
    return this.rentalService.markDelivered(id)
  }

  @Patch(':id/done')
  @ApiOperation({ summary: 'Mark a rental as completed (restocks furniture)' })
  @ApiParam(rentalIdParam)
  @ApiOkResponse({ description: 'Rental completed', type: Rental })
  @ApiResponse({ status: 400, description: 'Rental not delivered or not fully paid', type: ErrorResponseDto })
  @ApiResponse({ status: 404, description: 'Rental not found', type: ErrorResponseDto })
  done(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentalService.markDone(id)
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a rental (restocks furniture)' })
  @ApiParam(rentalIdParam)
  @ApiOkResponse({ description: 'Rental cancelled', type: Rental })
  @ApiResponse({ status: 400, description: 'Rental cannot be cancelled in its current status', type: ErrorResponseDto })
  @ApiResponse({ status: 404, description: 'Rental not found', type: ErrorResponseDto })
  cancel(@Param('id', ParseUUIDPipe) id: string){
    return this.rentalService.markCanceled(id)
  }

  @Patch(':id/deposit/:amount')
  @ApiOperation({ summary: 'Add a deposit payment to a rental' })
  @ApiParam(rentalIdParam)
  @ApiParam(amountParam)
  @ApiOkResponse({ description: 'Deposit added', type: Rental })
  @ApiResponse({ status: 400, description: 'Invalid amount or deposit exceeds total cost', type: ErrorResponseDto })
  @ApiResponse({ status: 404, description: 'Rental not found', type: ErrorResponseDto })
  deposit(@Param('id', ParseUUIDPipe) id: string,
  @Param('amount',ParseFloatPipe) amount: number){
    return this.rentalService.addDeposit(id, amount)
  }
}
