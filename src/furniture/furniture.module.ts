import { Module } from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { FurnitureController } from './furniture.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FurnitureController],
  providers: [FurnitureService, PrismaService],
})
export class FurnitureModule {}
