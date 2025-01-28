import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, Length } from "class-validator";

export class CreateClientDto {
    @ApiProperty({
        description: 'Firt name and last name of client',
        example: 'Jonh Doe'
    })
    @IsString()
    @Length(3, 30)
    name: string;

    @ApiProperty({
        description: 'Phone number(s) of client',
        example: '+503 6789-1234'
    })
    @IsString({each: true})
    phone: string[];

    @ApiProperty({
        description: 'Latitude of rental location',
        example: 10.1215231
    })
    @IsLatitude()
    latitude: number;

    @ApiProperty({
        description: 'Longitude of rental location',
        example: 98.2145134
    })
    @IsLongitude()
    longitude: number;

    @ApiProperty({
        description: 'Address reference',
        example: 'Casa roja cerca de tienda Marllory'
    })
    @IsString()
    @Length(10, 200)
    addressReference: string;

    @ApiProperty({
        description: 'Notes about the client'
    })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty({
        description: 'If client is active or no longer reserves',
        example: true
    })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
