import { IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateClientDto {
    @IsString()
    @Length(3, 30)
    name: string;

    @IsString()
    phone: string;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;

    @IsString()
    @Length(10, 200)
    addressReference: string;

    @IsString()
    @IsOptional()
    @Length(10, 1000)
    notes?: string;

    @IsBoolean()
    isActive: boolean;
}
