import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnitureModule } from './furniture/furniture.module';

@Module({
  imports: [FurnitureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
