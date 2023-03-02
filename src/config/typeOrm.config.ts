import { ConfigService } from "@nestjs/config";
import "dotenv/config";
import { Person } from "../people/entities/person.entity";
import { Film } from "../films/entities/Film.entity";
import { DataSource } from "typeorm";
import { CreatePeopleTable1677713024356 } from "../migrations/1677713024356-CreatePeopleTable";
import { CreateFilmsTable1677778830638 } from "../migrations/1677778830638-CreateFilmsTable";

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Person, Film],
    migrations: [
        CreatePeopleTable1677713024356, CreateFilmsTable1677778830638
    ],
})