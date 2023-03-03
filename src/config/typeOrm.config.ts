import "dotenv/config";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { Person } from "../people/entities/person.entity";
import { Film } from "../films/entities/film.entity";
import { Planet } from "../planets/entities/planet.entity";
import { CreatePeopleTable1677713024356 } from "../migrations/1677713024356-CreatePeopleTable";
import { CreateFilmsTable1677778830638 } from "../migrations/1677778830638-CreateFilmsTable";
import { CreatePeopleFilmsRelation1677786864219 } from "../migrations/1677786864219-CreatePeopleFilmsRelation";
import { CreatePlanetsTable1677800054143 } from "../migrations/1677800054143-CreatePlanetsTable";
import { CreatePlanetPeopleRelation1677800608083 } from "../migrations/1677800608083-CreatePlanetPeopleRelation";
import { CreateFilmsPlanetsRelation1677805421510 } from "../migrations/1677805421510-CreateFilmsPlanetsRelation";

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Person, Film, Planet],
    migrations: [
        CreatePeopleTable1677713024356, CreateFilmsTable1677778830638,
        CreatePeopleFilmsRelation1677786864219, CreatePlanetsTable1677800054143,
        CreatePlanetPeopleRelation1677800608083, CreateFilmsPlanetsRelation1677805421510
    ],
})