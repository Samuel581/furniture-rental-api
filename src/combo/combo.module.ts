import { Module } from '@nestjs/common';
import { ComboService } from './combo.service';
import { ComboController } from './combo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ComboController],
  providers: [ComboService, PrismaService],
})
export class ComboModule {}
