import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

// Months enum for easy date mamangment
export enum MONTH { 
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12
}

interface MonthRange {
  month: MONTH,
  monthName: string,
  startDate: Date,
  endDate: Date
}

@Injectable()
export class ReportService {

  constructor(private prisma: PrismaService){}

  // Gets the current month range. Use TODO
  private getCurrentMonthRange(): MonthRange {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const startDate = new Date(Date.UTC(year, now.getMonth(), 1, 0, 0, 0, 0))
    const endDate = new Date(Date.UTC(year, now.getMonth() + 1, 1, 0, 0, 0, 0))

    return {
      month: month as MONTH,
      monthName: MONTH[month],
      startDate,
      endDate
    }
  }

  // Gets the date range for a required month
  private getMonthRange(month: MONTH, year?: number): MonthRange {
    const targetYear = year ?? new Date().getFullYear();

    const startDate = new Date(Date.UTC(targetYear, month, 1, 0, 0, 0, 0))
    const endDate = new Date(Date.UTC(targetYear, month + 1, 1, 0, 0, 0, 0))

    return {
      month: month as MONTH,
      monthName: MONTH[month],
      startDate,
      endDate
    }
  }

  // Count of rentals per current month
  totalCountOfRentals() {
    const dateRange = this.getCurrentMonthRange()

    return this.prisma.rental.count({
      where: {
        startDate: {
          gte: dateRange.startDate,
          lte: dateRange.endDate
        }
      }
    })
  }

  // Total gains per current month
  totalSumGainsRentals() {
    return this.prisma.rental.aggregate({
      where: {},
      _sum: {
        totalAmount: true
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

  // TODO: Make function to clasify somehow which month is currently the user
  
}
