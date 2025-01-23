import { PartialType } from '@nestjs/swagger';
import { CreateFurnitureDto } from './create-furniture.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateFurnitureDto extends PartialType(OmitType(CreateFurnitureDto, ['isActive'] as const)) {}
