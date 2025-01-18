import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PrismaService } from 'src/prisma.service';
import {  Prisma, RentalStatus } from '@prisma/client';
import { GetRentalsQueryDto } from './dto/rental-filtering.dto';
@Injectable()
export class RentalService {

  constructor(private prisma: PrismaService){}

  async findAllNotCancelled(query: GetRentalsQueryDto){
    const filters: Prisma.RentalWhereInput = {}

    // Filters bases on query
    if(query.status){
      filters.rentalStatus = query.status;
    }

    if(query.startDate){
      filters.startDate = {
        gte: new Date(query.startDate)
      }
    }

    if(query.endDate){
      filters.endDate = {
        lte: new Date(query.endDate)
      }
    }

    return this.prisma.rental.findMany({
      where: filters,
      include: {
        rentalItems: {
          include: {
            furniture: true,
            combo: true
          }
        }
      }
    })
  }

  async findManyByClientId(id: string){
    return this.prisma.rental.findMany({
      where: { id: id }
    })
  }

  async create(createRentalDto: CreateRentalDto) {

    const startDate = new Date(createRentalDto.startDate);
    const endDate = new Date(createRentalDto.endDate);

    if (startDate >= endDate){
      throw new BadRequestException('End date must be after start date');
    }

    //Duration in days
    //TODO: Check if with an external library is better
    const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

    return await this.prisma.$transaction(async (tx) => {
      // 1st: We check if client exists
      const client = await tx.client.findUnique({
        where: { id: createRentalDto.clientId}
      })

      if(!client || !client.isActive){
        throw new BadRequestException('Client either not found or not active');
      }

      // 2nd: Validate items
      let totalAmount: number = 0;
      const rentalItemsData = [];

      for(const item of createRentalDto.items){
        // Validations if the rental item is a furniture
        if(item.furnitureId){
          // We get the furniture that we are trying to rent in order to check important data
          const furniture = await tx.furniture.findUnique({
            where: { id: item.furnitureId }
          });

          // Check if the furniture is valid
          if(!furniture || !furniture.isActive){
            throw new BadRequestException(`Furniture with ID ${item.furnitureId} not found or inactive`);
          }

          // Check if we have enough stock
          if(furniture.stock < item.quantity){
            throw new BadRequestException(
              `There is not enought stock for the item with ID ${item.furnitureId}. Required: ${item.quantity}, Aviable: ${furniture.stock}`
            );
          }

          // Calculate total
          const itemTotal = Number(furniture.dailyRate) * item.quantity * durationInDays;
          totalAmount += itemTotal;

          // We insert the rental item data into our array of rental items
          rentalItemsData.push({
            furnitureId: item.furnitureId,
            quantity: item.quantity, 
          })

          // Update the stock of the furniture if all the transactions till this point where succesfull
          await tx.furniture.update({
            where: { id: item.furnitureId },
            data: { stock: furniture.stock - item.quantity}
          })
        }
        // If the item is not a furniture per se, then is a combo and we check if it's valid an if there is stock
        else if(item.comboId){
          const selectedCombo = await tx.combo.findUnique({
            where: { id: item.comboId },
            include: { ComboFurniture: { include: { furniture: true }}},
          })

          if(!selectedCombo || !selectedCombo.isActive){
            throw new BadRequestException(`The combo with id ${item.comboId} is not valid`);
          }

          // Check item by item on the combo's furnitures to check if there is enough stock for the combos needed
          for(const furnitureInCombo of selectedCombo.ComboFurniture){
            const quantityPerCombo: number = furnitureInCombo.quantity;
            const numberOfCombosRequested: number = item.quantity;
            const totalFurnitureNeeded: number = quantityPerCombo * numberOfCombosRequested;
            const aviableStockOfFurniture: number = furnitureInCombo.furniture.stock;

            if( aviableStockOfFurniture < totalFurnitureNeeded ){
              throw new BadRequestException(
                `Insufficient stock for ${furnitureInCombo.furniture.name} in combo ${selectedCombo.name}. ` +
                `Need ${totalFurnitureNeeded} (${quantityPerCombo} per combo × ${numberOfCombosRequested} combos), ` +
                `but only ${aviableStockOfFurniture} available`
              );
            }
          }

          // Calculate total of combo
          const comboTotal = selectedCombo.dailyRate * item.quantity * durationInDays;
          totalAmount += comboTotal;

          // Add to the array of rental items
          rentalItemsData.push({
            quantity: item.quantity,
            dailyRate: selectedCombo.dailyRate,
            comboId: item.comboId
          })

          // If the process didn't get interrupted them we update the stock on the furnitures that make the combo
          for( const furnitureInCombo of selectedCombo.ComboFurniture){
            const totalStockNeeded: number = furnitureInCombo.quantity * item.quantity;
            await tx.furniture.update({
              where: { id: furnitureInCombo.furniture.id },
              data: { stock: furnitureInCombo.furniture.stock - totalStockNeeded}
            })
          }
        } else {
          throw new BadRequestException('Invalid rental item: must specify either furnitureId or comboId');
        }
      }

      // 3rd: After all the checks we create the rental
      const rental = await tx.rental.create({
        data: {
          clientId: createRentalDto.clientId,
          startDate,
          endDate,
          depositAmount: createRentalDto.depositAmount,
          totalAmount,
          notes: createRentalDto.notes,
          secondaryDeliveryAddress: createRentalDto.secondaryDeliveryAddress,
          //TODO: Check and explain how this work
          rentalItems: {
            create: rentalItemsData.map(item => ({
              quantity: item.quantity,
              ...(item.furnitureId ? {
                furniture: {
                  connect: { id: item.furnitureId}
                }
              }: {}),
              ...(item.comboId ? {
                combo: {
                  connect: { id: item.comboId}
                }
              }: {})
            }))
          }
        },
        include: {
          client: true,
          rentalItems: {
            include: {
              furniture: true,
              combo: true
            }
          }
        }
      });
      return rental;
    });
    
  }

  async markDelivered(id: string){
    return this.prisma.rental.update({
      where: { id: id },
      data: {
        rentalStatus: RentalStatus.DELIVERED
      }
    })
  }

  async markDone(id: string){
    const rental = await this.findOne(id);

    // Validating the rental status
    if(rental.rentalStatus !== RentalStatus.DELIVERED){
      throw new BadRequestException(
        `Cannot complete rental in ${rental.rentalStatus} status. Rental must be DELIVERED first.`
      );
    }

    // Add validation to control if the rental is fully payed yet or not
    if(rental.depositAmount < rental.totalAmount){
      throw new BadRequestException(
        `Cannot complete this rental. Total amount: ${rental.totalAmount} but ${rental.depositAmount} has been payed`
      )
    }

    // Using transactions to ensure we restock the furniture
    return await this.prisma.$transaction(async (tx) => {

      // Updating the status
      const updatedRental = tx.rental.update({
        where: { id:id },
        data: { rentalStatus: RentalStatus.COMPLETED}
      })

      for(const rentalItem of rental.rentalItems){
        // Check if the rental item is a furniture
        if(rentalItem.furnitureId){
          // Restocking
          await tx.furniture.update({
            where: { id: rentalItem.furnitureId },
            data: {
              stock: {
                increment: rentalItem.quantity
              }
            }
          })
        }
        // If not a solo furniture then is a combo
        else if(rentalItem.comboId){
          // Iterate the furnitures in the combo
          for( const furnitureInCombo of rentalItem.combo.ComboFurniture ){
            // NOTE: This was a bit buzzy
            const totalRestockQuantity = rentalItem.quantity * furnitureInCombo.quantity;
            // Restocking
            await tx.furniture.update({
              where: { id: furnitureInCombo.furnitureId },
              data: {
                stock: {
                  increment: totalRestockQuantity,
                }
              }
            })
          }
        }
      }

      // Returning the updated rental
      return updatedRental;
    })
    
  }

  findOne(id: string) {
    const rental = this.prisma.rental.findUnique({
      where: { id: id },
      include: {
        rentalItems: {
          include: {
            furniture: true,
            combo: {
              include: {
                ComboFurniture: {
                  include: {
                    furniture: true
                  }
                }
              }
            }
          }
        }
      }      
    });
    if(!rental){
      throw new BadRequestException(`Rental with id ${id} not found`)
    } 
    return rental;
  }

  //TODO
  async markCanceled(id: number, updateRentalDto: UpdateRentalDto) {
    // TODO: Make service
    return `This action updates a #${id} rental`;
  }


}
