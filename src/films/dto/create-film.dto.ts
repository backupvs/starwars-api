import { CreatePersonDto } from "../../people/dto/create-person.dto";
import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";

export class CreateFilmDto {
    readonly title: string;
    readonly episodeId: number;
    readonly openingCrawl: string;
    readonly director: string;
    readonly producer: string;
    readonly releaseDate: Date;
    readonly characters: CreatePersonDto[];
    readonly planets: CreatePlanetDto[];
    readonly starships: string[]; // Starship[]
    readonly vehicles: string[]; // Vehicle[]
    readonly species: string[]; // Species[]
}