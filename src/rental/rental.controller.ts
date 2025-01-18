import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { GetRentalsQueryDto } from './dto/rental-filtering.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @Get()
  findAllActive(@Query() query: GetRentalsQueryDto) {
    return this.rentalService.findAllNotCancelled(query);
  }

  @Get('/client/:id')
  findByClientId(@Param('id', ParseUUIDPipe) id: string){
    return this.rentalService.findManyByClientId(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentalService.findOne(id);
  }

  @Patch(':id/deliver')
  update(@Param('id', ParseUUIDPipe) id: string,) {
    return this.rentalService.markDelivered(id)
  }

  @Patch(':id/done')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentalService.markDone(id)
  }
}
