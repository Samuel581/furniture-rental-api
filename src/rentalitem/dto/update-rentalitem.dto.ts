import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalitemDto } from './create-rentalitem.dto';

export class UpdateRentalitemDto extends PartialType(CreateRentalitemDto) {}
