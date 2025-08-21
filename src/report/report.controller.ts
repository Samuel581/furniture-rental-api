import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';


@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/all')
  totalRentals() {
    return this.reportService.findAll();
  }

  @Get('totalGains')
  totalGainsCurrentMonth(){
    // TODO
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
