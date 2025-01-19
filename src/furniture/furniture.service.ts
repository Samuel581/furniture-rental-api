import { Injectable } from '@nestjs/common';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { PrismaService } from 'src/prisma.service';
import { Furniture, Prisma } from '@prisma/client';
import { GetFurnituresQueryDto } from './dto/furniture-filtering.dto';

@Injectable()
export class FurnitureService {
  constructor(private prisma: PrismaService){}

  async create(createFurnitureDto: CreateFurnitureDto): Promise<Furniture | null> {
    return this.prisma.furniture.create({
      data: createFurnitureDto ,
    });
  }

  async findAll(query: GetFurnituresQueryDto){
    const filters : Prisma.FurnitureWhereInput = {
      isActive: true,
    }

    let limit: number = 10;
    let skipBasedOnPageNumber: number = 0;

    // Adding filters
    if(query.type){
      filters.type = query.type;
    }

    // Filters for stock
    if(query.minStock !== undefined || query.maxStock !== undefined){
      filters.stock = {
        // Ternary operators for gte and lte filters
        ...(query.minStock !== undefined && { gte: query.minStock }),
        ...(query.maxStock !== undefined && { gte: query.maxStock })
      }
    }

    const orderBy: Prisma.FurnitureOrderByWithRelationInput = {};
    if(query.sortBy) {
      orderBy[query.sortBy] = query.orderBy || 'asc';
    }

    if(query.limit){
      limit = query.limit 
    }

    if(query.page){
      skipBasedOnPageNumber = limit * query.page;
    }

    return this.prisma.furniture.findMany({
      // Filtering
      where: filters,
      // OrderBy if aplies, if not just order ascending by furniture name
      orderBy: Object.keys(orderBy).length > 0 ? orderBy : { name: 'asc' },
      take: limit,
      skip: skipBasedOnPageNumber
    });
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

  async remove(id: string) {
    return this.prisma.furniture.update({
      where: { id },
      data: {
        isActive: false,
      }
    });
  }
}
