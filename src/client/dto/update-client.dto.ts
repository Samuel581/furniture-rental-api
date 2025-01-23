import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateClientDto extends PartialType(
    // Doesnt let asActive field to be updated in this endpoint
    OmitType(CreateClientDto, ['isActive'] as const)
) {}
