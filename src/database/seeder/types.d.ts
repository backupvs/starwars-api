import { CreateFilmDto } from "../../resources/films/dto/create-film.dto";
import { CreatePersonDto } from "../../resources/people/dto/create-person.dto";
import { CreatePlanetDto } from "../../resources/planets/dto/create-planet.dto";
import { CreateSpeciesDto } from "../../resources/species/dto/create-species.dto";
import { CreateStarshipDto } from "../../resources/starships/dto/create-starship.dto";
import { CreateVehicleDto } from "../../resources/vehicles/dto/create-vehicle.dto";

declare type MetaInformation = {
    url: string
    created: string,
    edited: string
}

declare interface SwapiResponseData {
    count: number;
    next: string | null;
    previous?: string | null;
    results: SwapiEntity[]
}

declare type SwapiEntity =
    CreatePersonDto & MetaInformation |
    CreateFilmDto & MetaInformation |
    CreatePlanetDto & MetaInformation |
    CreateVehicleDto & MetaInformation |
    CreateStarshipDto & MetaInformation |
    CreateSpeciesDto & MetaInformation;

declare type CreateDtos = {
    people: CreatePersonDto[];
    films: CreateFilmDto[];
    planets: CreatePlanetDto[];
    vehicles: CreateVehicleDto[];
    starships: CreateStarshipDto[];
    species: CreateSpeciesDto[];
}

declare type CreateDtosWithIds = {
    peopleWithIds: (CreatePersonDto & { id: number })[];
    filmsWithIds: (CreateFilmDto & { id: number })[];
    planetsWithIds: (CreatePlanetDto & { id: number })[];
    vehiclesWithIds: (CreateVehicleDto & { id: number })[];
    starshipsWithIds: (CreateStarshipDto & { id: number })[];
    speciesWithIds: (CreateSpeciesDto & { id: number })[];
}