import { CreateFilmDto } from "src/films/dto/create-film.dto";
import { CreatePersonDto } from "src/people/dto/create-person.dto";

export class CreatePlanetDto {
    readonly name: string;
    readonly rotationPeriod: string;
    readonly orbitalPeriod: string;
    readonly gravity: string;
    readonly population: string;
    readonly climate: string;
    readonly terrain: string;
    readonly surfaceWater: string;
    readonly residents: CreatePersonDto[];
    readonly films: CreateFilmDto[];
}