import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RentalService {

  constructor(private prisma: PrismaService){}

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
          rentalItems: {
            create: rentalItemsData
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

  findAll() {
    return `This action returns all rental`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
