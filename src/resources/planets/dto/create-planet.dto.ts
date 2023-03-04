import { Type } from "class-transformer";
import { IsString, IsArray, ValidateNested } from "class-validator";
import { CreateFilmDto } from "../../films/dto/create-film.dto";
import { CreatePersonDto } from "../../people/dto/create-person.dto";

export class CreatePlanetDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly rotationPeriod: string;

    @IsString()
    readonly orbitalPeriod: string;

    @IsString()
    readonly diameter: string;

    @IsString()
    readonly gravity: string;

    @IsString()
    readonly population: string;

    @IsString()
    readonly climate: string;

    @IsString()
    readonly terrain: string;

    @IsString()
    readonly surfaceWater: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePersonDto)
    readonly residents: CreatePersonDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFilmDto)
    readonly films: CreateFilmDto[];
}