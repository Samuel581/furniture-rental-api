import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalitemService } from './rentalitem.service';
import { CreateRentalitemDto } from './dto/create-rentalitem.dto';
import { UpdateRentalitemDto } from './dto/update-rentalitem.dto';

@Controller('rentalitem')
export class RentalitemController {
  constructor(private readonly rentalitemService: RentalitemService) {}

  @Post()
  create(@Body() createRentalitemDto: CreateRentalitemDto) {
    return this.rentalitemService.create(createRentalitemDto);
  }

  @Get()
  findAll() {
    return this.rentalitemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalitemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalitemDto: UpdateRentalitemDto) {
    return this.rentalitemService.update(+id, updateRentalitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalitemService.remove(+id);
  }
}
