import { Injectable } from '@nestjs/common';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';

@Injectable()
export class FurnitureService {
  create(createFurnitureDto: CreateFurnitureDto) {
    return 'This action adds a new furniture';
  }

  findAll() {
    return `This action returns all furniture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} furniture`;
  }

  update(id: number, updateFurnitureDto: UpdateFurnitureDto) {
    return `This action updates a #${id} furniture`;
  }

  remove(id: number) {
    return `This action removes a #${id} furniture`;
  }
}
