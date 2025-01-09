import { Injectable } from '@nestjs/common';
import { CreateRentalitemDto } from './dto/create-rentalitem.dto';
import { UpdateRentalitemDto } from './dto/update-rentalitem.dto';

@Injectable()
export class RentalitemService {
  create(createRentalitemDto: CreateRentalitemDto) {
    return 'This action adds a new rentalitem';
  }

  findAll() {
    return `This action returns all rentalitem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rentalitem`;
  }

  update(id: number, updateRentalitemDto: UpdateRentalitemDto) {
    return `This action updates a #${id} rentalitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentalitem`;
  }
}
