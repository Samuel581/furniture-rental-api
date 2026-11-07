import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client | null>{
    try {
      return await this.prisma.client.update({
        where: { id },
        data: { ...updateClientDto }
      })
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Client with id ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.client.update({
        where: { id },
        data: {
          isActive: false,
        }
      })
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Client with id ${id} not found`);
      }
      throw error;
    }
  }

  //TODO
  async findAllWithRentals(){
    return true;
  }
}
