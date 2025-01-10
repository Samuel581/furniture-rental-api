import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService){}

  async create(createClientDto: CreateClientDto): Promise<Client | null> {
    return this.prisma.client.create({
      data: createClientDto,
    })
  }

  async findAll(): Promise<Client[] | null> {
    return this.prisma.client.findMany();
  }

  findOne(id: string): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  update(id: string, updateClientDto: UpdateClientDto): Promise<Client | null>{
    return this.prisma.client.update({
      where: { id },
      data: { ...updateClientDto }
    })
  }

  remove(id: string) {
    return this.prisma.client.delete({
      where: { id }
    })
  }
}
