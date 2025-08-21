import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnitureModule } from './furniture/furniture.module';
import { ComboModule } from './combo/combo.module';
import { RentalModule } from './rental/rental.module';
import { ClientModule } from './client/client.module';
import { ReportsModule } from './reports/reports.module';
import { ReportResolver } from './report/report.resolver';
import { ReportModule } from './report/report.module';

@Module({
  imports: [ClientModule, FurnitureModule, ComboModule, RentalModule, ReportsModule, ReportModule],
  controllers: [AppController],
  providers: [AppService, ReportResolver],
})
export class AppModule {}
