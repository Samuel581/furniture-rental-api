import { Injectable } from '@nestjs/common';
import { CreateComboitemDto } from './dto/create-comboitem.dto';
import { UpdateComboitemDto } from './dto/update-comboitem.dto';

@Injectable()
export class ComboitemService {
  create(createComboitemDto: CreateComboitemDto) {
    return 'This action adds a new comboitem';
  }

  findAll() {
    return `This action returns all comboitem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comboitem`;
  }

  update(id: number, updateComboitemDto: UpdateComboitemDto) {
    return `This action updates a #${id} comboitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} comboitem`;
  }
}
