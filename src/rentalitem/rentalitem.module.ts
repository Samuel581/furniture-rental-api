import { Module } from '@nestjs/common';
import { RentalitemService } from './rentalitem.service';
import { RentalitemController } from './rentalitem.controller';

@Module({
  controllers: [RentalitemController],
  providers: [RentalitemService],
})
export class RentalitemModule {}
