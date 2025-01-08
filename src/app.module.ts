import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnitureModule } from './furniture/furniture.module';
import { ComboModule } from './combo/combo.module';

@Module({
  imports: [FurnitureModule, ComboModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
