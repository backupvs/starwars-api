import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";
import { CreateFilmDto } from "../../films/dto/create-film.dto";

export class CreatePersonDto {
    readonly name: string;
    readonly height: string;
    readonly mass: string;
    readonly hairColor: string;
    readonly skinColor: string;
    readonly eyeColor: string;
    readonly birthYear: string;
    readonly gender: string;
    readonly homeworld: CreatePlanetDto;
    readonly films: CreateFilmDto[];
    readonly species: string[]; // Species[]
    readonly vehicles: string[]; // Vehicle[]
    readonly starships: string[]; // Starship[]
}