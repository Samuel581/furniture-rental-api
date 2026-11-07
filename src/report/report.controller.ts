import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { ReportQueryDateDto } from './dto/report-query-date.dto';
import {
  ReportRentalsCountDto,
  ReportTotalGainsDto,
  ReportTopClientDto,
} from './dto/report-response.dto';
import { Client } from '../client/entities/client.entity';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/rentalsCount')
  @ApiOperation({ summary: 'Count rentals in a period' })
  @ApiOkResponse({ description: 'Total number of rentals', type: ReportRentalsCountDto })
  totalRentals(@Query() query: ReportQueryDateDto) {
    const { month, year } = query;
    return this.reportService.totalCountOfRentals(month, year);
  }

  @Get('/totalGains')
  @ApiOperation({ summary: 'Sum of rental gains in a period' })
  @ApiOkResponse({ description: 'Total gains', type: ReportTotalGainsDto })
  totalGainsCurrentMonth(@Query() query: ReportQueryDateDto) {
    const { month, year } = query;
    return this.reportService.totalSumGainsRentals(month, year);
  }

  @Get('/activeUsers')
  @ApiOperation({ summary: 'List active clients' })
  @ApiOkResponse({ description: 'Active clients', type: [Client] })
  totalActiveUsers() {
    return this.reportService.activeUsers();
  }

  @Get('bestClients')
  @ApiOperation({ summary: 'Top 5 clients by total spent' })
  @ApiOkResponse({ description: 'Top clients', type: [ReportTopClientDto] })
  async topBestClients() {
    return this.reportService.topUsers();
  }
}
