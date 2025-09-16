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
  async totalCountOfRentals(month?: MONTH, year?: number) {
    const dateRange = month && year 
      ? this.getMonthRange(month, year)
      : this.getCurrentMonthRange();

    return await this.prisma.rental.count({
      where: {
        startDate: {
          gte: dateRange.startDate,
          lte: dateRange.endDate
        }
      }
    });
  }

  // Total gains per month
  async totalSumGainsRentals(month?: MONTH, year?: number) {
    const dateRange = month && year 
      ? this.getMonthRange(month, year)
      : this.getCurrentMonthRange();
      
    return await this.prisma.rental.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        startDate: {
          gte: dateRange.startDate,
          lte: dateRange.endDate
        }
      }
    });
  }

  async activeUsers(){
    return await this.prisma.client.findMany({
      where: {
        isActive: true
      }
    })
  }

  async topUsers(){
    // Get top 5 client IDs with their total amounts
    const topClients = await this.prisma.rental.groupBy({
      by: ['clientId'],
      where: {
        rentalStatus: 'COMPLETED'
      },
      _sum: {
        totalAmount: true
      },
      orderBy: {
        _sum: {
          totalAmount: 'desc'
        }
      },
      take: 5
    });

    // Get client details for each top client
    const clientsDetails = await Promise.all(
      topClients.map(async (client) => {
        const clientInfo = await this.prisma.client.findUnique({
          where: { id: client.clientId },
          select: {
            id: true,
            name: true,
            phone: true,
            addressReference: true
          }
        });

        return {
          client: clientInfo,
          totalSpent: client._sum.totalAmount,
          rentalCount: await this.prisma.rental.count({
            where: {
              clientId: client.clientId,
              rentalStatus: 'COMPLETED'
            }
          })
        };
      })
    );

    return clientsDetails;
  }  
}
