import { PartialType } from '@nestjs/mapped-types';
import { CreateCombofurnitureDto } from './create-combofurniture.dto';

export class UpdateCombofurnitureDto extends PartialType(CreateCombofurnitureDto) {}
