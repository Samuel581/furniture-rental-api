import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @Get()
  findAllActive() {
    return this.rentalService.findAllNotCancelled();
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
