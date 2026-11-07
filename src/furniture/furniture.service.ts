import { Injectable, NotFoundException } from '@nestjs/common';
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
    const furniture = await this.prisma.furniture.findUnique({
      where: {id}
    });

    if (!furniture) {
      throw new NotFoundException(`Furniture with id ${id} not found`);
    }

    return furniture;
  }

  async update(id: string, updateFurnitureDto: UpdateFurnitureDto) {
    try {
      return await this.prisma.furniture.update({
        where: { id },
        data: { ...updateFurnitureDto }
      });
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Furniture with id ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.furniture.update({
        where: { id },
        data: {
          isActive: false,
        }
      });
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Furniture with id ${id} not found`);
      }
      throw error;
    }
  }
}
