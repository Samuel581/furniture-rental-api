import { Module } from '@nestjs/common';
import { ComboitemService } from './comboitem.service';
import { ComboitemController } from './comboitem.controller';

@Module({
  controllers: [ComboitemController],
  providers: [ComboitemService],
})
export class ComboitemModule {}
