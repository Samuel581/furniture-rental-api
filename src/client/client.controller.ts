import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({summary: 'Creation of a client'})
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active clients' })
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unique client by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    example: 'b8a2f39d-ce57-46b7-88aa-ebacc540f311',
    description: 'Client ID'
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update client information'})
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    example: 'b8a2f39d-ce57-46b7-88aa-ebacc540f311',
    description: 'Client ID'
  })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Sets user to unactive' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    example: 'b8a2f39d-ce57-46b7-88aa-ebacc540f311',
    description: 'Client ID'
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientService.remove(id);
  }
}
