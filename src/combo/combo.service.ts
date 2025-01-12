import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { PrismaService } from 'src/prisma.service';
import { Furniture } from '@prisma/client';

@Injectable()
export class ComboService {

  constructor(private prisma: PrismaService){}

  async create(createComboDto: CreateComboDto) {

    await this.validateFurnitureItems(createComboDto.furnitureItems);

    try {
      const combo = await this.prisma.combo.create({
        data: {
          name: createComboDto.name,
          dailyRate: createComboDto.dailyRate,
          isActive: createComboDto.isActive,
          // We map the furnitures that make the combo in this way
          ComboFurniture: {
            create: createComboDto.furnitureItems.map(item => ({
              quantity: item.quantity,
              furniture: {
                connect: { id: item.furnitureId }
              }
            }))
          }
        },
        include: {
          ComboFurniture: {
            include: {
              furniture: true,
            }
          }
        }
      });

      return combo;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('A combo with this name already exists');
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all combo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combo`;
  }

  update(id: number, updateComboDto: UpdateComboDto) {
    return `This action updates a #${id} combo`;
  }

  remove(id: number) {
    return `This action removes a #${id} combo`;
  }

  private async validateFurnitureItems(items: CreateComboDto['furnitureItems']){
    // We deestructure the furniture if for each item we intend to add to the combo
    const furnitureIds: string[]  = items.map(item => item.furnitureId);

    // Find all the items intended to add to the combo
    const furnitureItems: Furniture[] = await this.prisma.furniture.findMany({
      where: {
        id: { in: furnitureIds},
        isActive: true
      }
    });

    // If the one or more of the items wasnt found or wasnt active we thow an error
    if(furnitureIds.length !== furnitureItems.length){
      throw new BadRequestException('One or more furniture items is either not active or non existent');
    }
  }
}
