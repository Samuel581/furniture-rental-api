import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { GetFurnituresQueryDto } from './dto/furniture-filtering.dto';

@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  create(@Body() createFurnitureDto: CreateFurnitureDto) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  findAll(@Query() query: GetFurnituresQueryDto) {
    return this.furnitureService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.furnitureService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateFurnitureDto: UpdateFurnitureDto) {
    return this.furnitureService.update(id, updateFurnitureDto);
  }

  @Patch(':id')
  makeNotActive(@Param('id', ParseUUIDPipe) id: string) {
    return this.furnitureService.remove(id);
  }
}
