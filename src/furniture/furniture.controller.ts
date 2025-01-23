import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { GetFurnituresQueryDto } from './dto/furniture-filtering.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  @ApiOperation({
    summary: 'Creation of a furniture'
  })
  create(@Body() createFurnitureDto: CreateFurnitureDto) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all the furnitures'
  })
  findAll(@Query() query: GetFurnituresQueryDto) {
    return this.furnitureService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one furniture by ID' })
  @ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'Furniture ID'
    })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.furnitureService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update data on furniture'})
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateFurnitureDto: UpdateFurnitureDto) {
    return this.furnitureService.update(id, updateFurnitureDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Mark furniture as unactive'})
  makeNotActive(@Param('id', ParseUUIDPipe) id: string) {
    return this.furnitureService.remove(id);
  }
}
