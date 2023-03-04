import "dotenv/config";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

import { Person } from "../resources/people/entities/person.entity";
import { Film } from "../resources/films/entities/film.entity";
import { Planet } from "../resources/planets/entities/planet.entity";
import { Species } from "../resources/species/entities/species.entity";
import { Vehicle } from "../resources/vehicles/entities/vehicle.entity";

import { CreatePeopleTable1677713024356 } from "../database/migrations/1677713024356-CreatePeopleTable";
import { CreateFilmsTable1677778830638 } from "../database/migrations/1677778830638-CreateFilmsTable";
import { CreatePeopleFilmsRelation1677786864219 } from "../database/migrations/1677786864219-CreatePeopleFilmsRelation";
import { CreatePlanetsTable1677800054143 } from "../database/migrations/1677800054143-CreatePlanetsTable";
import { CreatePlanetPeopleRelation1677800608083 } from "../database/migrations/1677800608083-CreatePlanetPeopleRelation";
import { CreateFilmsPlanetsRelation1677805421510 } from "../database/migrations/1677805421510-CreateFilmsPlanetsRelation";
import { CreateSpeciesTable1677857208688 } from "../database/migrations/1677857208688-CreateSpeciesTable";
import { CreateSpeciesPlanetRelation1677859091241 } from "../database/migrations/1677859091241-CreateSpeciesPlanetRelation";
import { CreateSpeciesPeopleRealtion1677860953122 } from "../database/migrations/1677860953122-CreateSpeciesPeopleRealtion";
import { CreateVehiclesTable1677947217001 } from "../database/migrations/1677947217001-CreateVehiclesTable";
import { CreateVehiclesPeopleRelation1677947958988 } from "../database/migrations/1677947958988-CreateVehiclesPeopleRelation";
import { CreateVehiclesFilmsRelation1677948637616 } from "../database/migrations/1677948637616-CreateVehiclesFilmsRelation";

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Person, Film, Planet, Species, Vehicle],
    migrations: [
        CreatePeopleTable1677713024356, CreateFilmsTable1677778830638,
        CreatePeopleFilmsRelation1677786864219, CreatePlanetsTable1677800054143,
        CreatePlanetPeopleRelation1677800608083, CreateFilmsPlanetsRelation1677805421510,
        CreateSpeciesTable1677857208688, CreateSpeciesPlanetRelation1677859091241,
        CreateSpeciesPeopleRealtion1677860953122, CreateVehiclesTable1677947217001,
        CreateVehiclesPeopleRelation1677947958988, CreateVehiclesFilmsRelation1677948637616
    ],
})