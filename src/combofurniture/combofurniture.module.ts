import { Module } from '@nestjs/common';
import { CombofurnitureService } from './combofurniture.service';
import { CombofurnitureController } from './combofurniture.controller';

@Module({
  controllers: [CombofurnitureController],
  providers: [CombofurnitureService],
})
export class CombofurnitureModule {}
