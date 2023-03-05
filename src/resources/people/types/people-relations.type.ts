import { Film } from "../../films/entities/film.entity";
import { Planet } from "../../planets/entities/planet.entity";
import { Species } from "../../species/entities/species.entity";
import { Starship } from "../../starships/entities/starship.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";

export type PeopleRelations = {
    films?: Film[];
    species?: Species[];
    vehicles?: Vehicle[];
    starships?: Starship[];
    homeworld?: Planet;
};