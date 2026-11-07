import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { FurnitureService } from './furniture.service';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { GetFurnituresQueryDto } from './dto/furniture-filtering.dto';
import { Furniture } from './entities/furniture.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

const furnitureIdParam = {
  name: 'id',
  type: String,
  format: 'uuid',
  example: '10c1acc1-ba55-4542-bef3-b0c782bc14b9',
  description: 'Furniture ID',
};

@ApiTags('furniture')
@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  @ApiOperation({ summary: 'Create a furniture item' })
  @ApiCreatedResponse({ description: 'Furniture created', type: Furniture })
  @ApiResponse({ status: 400, description: 'Validation error', type: ErrorResponseDto })
  create(@Body() createFurnitureDto: CreateFurnitureDto) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active furniture items' })
  @ApiOkResponse({ description: 'List of furniture items', type: [Furniture] })
  findAll(@Query() query: GetFurnituresQueryDto) {
    return this.furnitureService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one furniture item by ID' })
  @ApiParam(furnitureIdParam)
  @ApiOkResponse({ description: 'Furniture found', type: Furniture })
  @ApiResponse({ status: 404, description: 'Furniture not found', type: ErrorResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.furnitureService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update data on a furniture item' })
  @ApiParam(furnitureIdParam)
  @ApiOkResponse({ description: 'Furniture updated', type: Furniture })
  @ApiResponse({ status: 400, description: 'Validation error', type: ErrorResponseDto })
  @ApiResponse({ status: 404, description: 'Furniture not found', type: ErrorResponseDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateFurnitureDto: UpdateFurnitureDto) {
    return this.furnitureService.update(id, updateFurnitureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mark a furniture item as inactive' })
  @ApiParam(furnitureIdParam)
  @ApiOkResponse({ description: 'Furniture marked as inactive', type: Furniture })
  @ApiResponse({ status: 404, description: 'Furniture not found', type: ErrorResponseDto })
  makeNotActive(@Param('id', ParseUUIDPipe) id: string) {
    return this.furnitureService.remove(id);
  }
}
