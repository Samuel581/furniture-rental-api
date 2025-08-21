import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportService {

  constructor(private prisma: PrismaService){}

  private monthsToDateRange(){

  }

  // Count of rentals per current month
  totalSumRentals() {
    return this.prisma.rental.count({})
  }

  // Total gains per current month
  totalSumGainsRentals() {
    return this.prisma.rental.aggregate({
      where: {startDate: ""},
      _sum: {
        totalAmount: true
      }
    })
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

  // TODO: Make function to clasify somehow which month is currently the user
  
}
