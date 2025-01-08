import { PartialType } from '@nestjs/mapped-types';
import { CreateComboitemDto } from './create-comboitem.dto';

export class UpdateComboitemDto extends PartialType(CreateComboitemDto) {}
