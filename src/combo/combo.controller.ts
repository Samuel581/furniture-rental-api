import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { ComboService } from './combo.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { Combo } from './entities/combo.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

const comboIdParam = {
  name: 'id',
  type: String,
  format: 'uuid',
  example: 'c1a2b3c4-d5e6-47f8-9a0b-1c2d3e4f5a6b',
  description: 'Combo ID',
};

@ApiTags('combo')
@Controller('combo')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Post()
  @ApiOperation({ summary: 'Create a combo package' })
  @ApiCreatedResponse({ description: 'Combo created', type: Combo })
  @ApiResponse({ status: 400, description: 'Validation error', type: ErrorResponseDto })
  @ApiResponse({ status: 409, description: 'A combo with this name already exists', type: ErrorResponseDto })
  create(@Body() createComboDto: CreateComboDto) {
    return this.comboService.create(createComboDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all combo packages' })
  @ApiOkResponse({ description: 'List of combos', type: [Combo] })
  findAll() {
    return this.comboService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a combo package by ID' })
  @ApiParam(comboIdParam)
  @ApiOkResponse({ description: 'Combo found', type: Combo })
  @ApiResponse({ status: 404, description: 'Combo not found', type: ErrorResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.comboService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a combo package' })
  @ApiParam(comboIdParam)
  @ApiOkResponse({ description: 'Combo updated', type: Combo })
  @ApiResponse({ status: 400, description: 'Validation error', type: ErrorResponseDto })
  @ApiResponse({ status: 404, description: 'Combo not found', type: ErrorResponseDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateComboDto: UpdateComboDto) {
    return this.comboService.update(id, updateComboDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mark a combo package as inactive' })
  @ApiParam(comboIdParam)
  @ApiOkResponse({ description: 'Combo marked as inactive', type: Combo })
  @ApiResponse({ status: 404, description: 'Combo not found', type: ErrorResponseDto })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.comboService.remove(id);
  }
}
