import { Type } from "class-transformer";
import { IsString, IsDate, IsNumber, IsArray, ValidateNested } from "class-validator";
import { CreatePersonDto } from "../../people/dto/create-person.dto";
import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";
import { CreateSpeciesDto } from "../../species/dto/create-species.dto";
import { CreateVehicleDto } from "../../vehicles/dto/create-vehicle.dto";

export class CreateFilmDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly episodeId: number;

    @IsString()
    readonly openingCrawl: string;

    @IsString()
    readonly director: string;

    @IsString()
    readonly producer: string;

    @IsDate()
    readonly releaseDate: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePersonDto)
    readonly characters: CreatePersonDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePlanetDto)
    readonly planets: CreatePlanetDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVehicleDto)
    readonly vehicles: CreateVehicleDto[];

    @IsString({ each: true })
    readonly starships: string[]; // Starship[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSpeciesDto)
    readonly species: CreateSpeciesDto[]; // Species[]
}