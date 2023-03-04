import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { CreateFilmDto } from "../../films/dto/create-film.dto";
import { CreatePersonDto } from "../../people/dto/create-person.dto";

export class CreateVehicleDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly model: string;

    @IsString()
    readonly vehicleClass: string;

    @IsString()
    readonly manufacturer: string;

    @IsString()
    readonly length: string;

    @IsString()
    readonly costInCredits: string;

    @IsString()
    readonly crew: string;

    @IsString()
    readonly passengers: string;

    @IsString()
    readonly maxAtmospheringSpeed: string;

    @IsString()
    readonly cargoCapacity: string;

    @IsString()
    readonly consumables: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFilmDto)
    readonly films: CreateFilmDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePersonDto)
    readonly pilots: CreatePersonDto[];
}
