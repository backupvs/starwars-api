import { Type } from "class-transformer";
import { IsString, IsArray, ValidateNested } from "class-validator";
import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";
import { CreateFilmDto } from "../../films/dto/create-film.dto";
import { CreateSpeciesDto } from "src/species/dto/create-species.dto";

export class CreatePersonDto {
    @IsString()
    readonly name: string;
    
    @IsString()
    readonly height: string;

    @IsString()
    readonly mass: string;

    @IsString()
    readonly hairColor: string;

    @IsString()
    readonly skinColor: string;

    @IsString()
    readonly eyeColor: string;

    @IsString()
    readonly birthYear: string;

    @IsString()
    readonly gender: string;

    @ValidateNested()
    @Type(() => CreatePlanetDto)
    readonly homeworld: CreatePlanetDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFilmDto)
    readonly films: CreateFilmDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSpeciesDto)
    readonly species: CreateSpeciesDto[];

    @IsString({ each: true })
    readonly vehicles: string[]; // Vehicle[]

    @IsString({ each: true })
    readonly starships: string[]; // Starship[]
}