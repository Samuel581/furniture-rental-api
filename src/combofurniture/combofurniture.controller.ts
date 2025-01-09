import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CombofurnitureService } from './combofurniture.service';
import { CreateCombofurnitureDto } from './dto/create-combofurniture.dto';
import { UpdateCombofurnitureDto } from './dto/update-combofurniture.dto';

@Controller('combofurniture')
export class CombofurnitureController {
  constructor(private readonly combofurnitureService: CombofurnitureService) {}

  @Post()
  create(@Body() createCombofurnitureDto: CreateCombofurnitureDto) {
    return this.combofurnitureService.create(createCombofurnitureDto);
  }

  @Get()
  findAll() {
    return this.combofurnitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combofurnitureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCombofurnitureDto: UpdateCombofurnitureDto) {
    return this.combofurnitureService.update(+id, updateCombofurnitureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combofurnitureService.remove(+id);
  }
}
