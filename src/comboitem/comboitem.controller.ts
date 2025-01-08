import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComboitemService } from './comboitem.service';
import { CreateComboitemDto } from './dto/create-comboitem.dto';
import { UpdateComboitemDto } from './dto/update-comboitem.dto';

@Controller('comboitem')
export class ComboitemController {
  constructor(private readonly comboitemService: ComboitemService) {}

  @Post()
  create(@Body() createComboitemDto: CreateComboitemDto) {
    return this.comboitemService.create(createComboitemDto);
  }

  @Get()
  findAll() {
    return this.comboitemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comboitemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComboitemDto: UpdateComboitemDto) {
    return this.comboitemService.update(+id, updateComboitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comboitemService.remove(+id);
  }
}
