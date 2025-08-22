import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportQueryDateDto } from './dto/report-query-date.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/rentalsCount')
  totalRentals(@Query() query: ReportQueryDateDto) {
    const { month, year } = query;
    return this.reportService.totalCountOfRentals(month, year);
  }

  @Get('/totalGains')
  totalGainsCurrentMonth(@Query() query: ReportQueryDateDto) {
    const { month, year } = query;
    return this.reportService.totalSumGainsRentals(month, year);
  }

  @Get('/activeUsers')
  totalActiveUsers() {
    // TODO
  }

  @Get('/gainsPerYear')
  totalGainsPerYear() {
    // TODO
  }

  @Get('bestClients')
  topBestClients() {
    // TODO
  }
}
