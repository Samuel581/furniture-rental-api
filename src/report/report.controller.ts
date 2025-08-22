import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { PrismaService } from 'src/prisma.service';


@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/all')
  totalRentals() {
    return this.reportService.totalCountOfRentals();
  }

  @Get('totalGains')
  totalGainsCurrentMonth(){
    return this.reportService.totalSumGainsRentals();
  }

  @Get('/activeUsers')
  totalActiveUsers(){
    // TODO
  }

  @Get('/gainsPerYear')
  totalGainsPerYear(){
    // TODO
  }

  @Get('bestClients')
  topBestClients(){
    // TODO
  }
}
