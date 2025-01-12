import { Injectable } from '@nestjs/common';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { PrismaService } from 'src/prisma.service';
import { Furniture } from '@prisma/client';

@Injectable()
export class FurnitureService {
  constructor(private prisma: PrismaService){}

  async create(createFurnitureDto: CreateFurnitureDto): Promise<Furniture | null> {
    return this.prisma.furniture.create({
      data: createFurnitureDto ,
    });
  }

  async findAll() {
    return this.prisma.furniture.findMany();
  }

  async findOne(id: string) {
    return this.prisma.furniture.findUnique({
      where: {id}
    });
  }

  async update(id: string, updateFurnitureDto: UpdateFurnitureDto) {
    return this.prisma.furniture.update({
      where: { id },
      data: { ...updateFurnitureDto }
    });
  }

  remove(id: string) {
    return this.prisma.furniture.delete({
      where: { id }
    });
  }
}
