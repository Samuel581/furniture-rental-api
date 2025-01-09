import { IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateClientDto {
    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;

    @IsString()
    addressReference: string;

    @IsString()
    @IsOptional()
    notes: string;

    @IsBoolean()
    isActive: boolean;
}
