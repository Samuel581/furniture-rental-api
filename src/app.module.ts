import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnitureModule } from './furniture/furniture.module';
import { ComboModule } from './combo/combo.module';
import { RentalModule } from './rental/rental.module';
import { CombofurnitureModule } from './combofurniture/combofurniture.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ClientModule, FurnitureModule, ComboModule, RentalModule, CombofurnitureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
