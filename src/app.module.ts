import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnitureModule } from './furniture/furniture.module';
import { ComboModule } from './combo/combo.module';
import { ComboitemModule } from './comboitem/comboitem.module';
import { RentalModule } from './rental/rental.module';
import { RenterModule } from './renter/renter.module';
import { CombofurnitureModule } from './combofurniture/combofurniture.module';
import { ClientModule } from './client/client.module';
import { RentalitemModule } from './rentalitem/rentalitem.module';

@Module({
  imports: [FurnitureModule, ComboModule, ComboitemModule, RentalModule, RenterModule, CombofurnitureModule, ClientModule, RentalitemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
