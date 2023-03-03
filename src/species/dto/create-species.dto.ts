import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { CreateFilmDto } from "../../films/dto/create-film.dto";
import { CreatePersonDto } from "../../people/dto/create-person.dto";
import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";

export class CreateSpeciesDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly classification: string;

    @IsString()
    readonly designation: string;

    @IsString()
    readonly averageHeight: string;

    @IsString()
    readonly averageLifespan: string;

    @IsString()
    readonly eyeColors: string;

    @IsString()
    readonly hairColors: string;

    @IsString()
    readonly skinColors: string;

    @IsString()
    readonly language: string;

    @ValidateNested()
    @Type(() => CreatePlanetDto)
    readonly homeworld: CreatePlanetDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePersonDto)
    readonly people: CreatePersonDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFilmDto)
    readonly films: CreateFilmDto[];
}

