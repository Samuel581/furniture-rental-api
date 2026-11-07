import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

const clientIdParam = {
  name: 'id',
  type: String,
  format: 'uuid',
  example: 'b8a2f39d-ce57-46b7-88aa-ebacc540f311',
  description: 'Client ID',
};

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a client' })
  @ApiCreatedResponse({ description: 'Client created', type: Client })
  @ApiResponse({ status: 400, description: 'Validation error', type: ErrorResponseDto })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiOkResponse({ description: 'List of clients', type: [Client] })
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam(clientIdParam)
  @ApiOkResponse({ description: 'Client found', type: Client })
  @ApiResponse({ status: 404, description: 'Client not found', type: ErrorResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update client information' })
  @ApiParam(clientIdParam)
  @ApiOkResponse({ description: 'Client updated', type: Client })
  @ApiResponse({ status: 400, description: 'Validation error', type: ErrorResponseDto })
  @ApiResponse({ status: 404, description: 'Client not found', type: ErrorResponseDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mark a client as inactive' })
  @ApiParam(clientIdParam)
  @ApiOkResponse({ description: 'Client marked as inactive', type: Client })
  @ApiResponse({ status: 404, description: 'Client not found', type: ErrorResponseDto })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientService.remove(id);
  }
}
