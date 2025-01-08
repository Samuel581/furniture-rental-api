import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnitureModule } from './furniture/furniture.module';
import { ComboModule } from './combo/combo.module';
import { ComboitemModule } from './comboitem/comboitem.module';

@Module({
  imports: [FurnitureModule, ComboModule, ComboitemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
