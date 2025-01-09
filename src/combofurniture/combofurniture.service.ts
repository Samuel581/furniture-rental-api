import { Injectable } from '@nestjs/common';
import { CreateCombofurnitureDto } from './dto/create-combofurniture.dto';
import { UpdateCombofurnitureDto } from './dto/update-combofurniture.dto';

@Injectable()
export class CombofurnitureService {
  create(createCombofurnitureDto: CreateCombofurnitureDto) {
    return 'This action adds a new combofurniture';
  }

  findAll() {
    return `This action returns all combofurniture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combofurniture`;
  }

  update(id: number, updateCombofurnitureDto: UpdateCombofurnitureDto) {
    return `This action updates a #${id} combofurniture`;
  }

  remove(id: number) {
    return `This action removes a #${id} combofurniture`;
  }
}
