import { ConfigService } from "@nestjs/config";
import "dotenv/config";
import { Person } from "../people/entities/person.entity";
import { DataSource } from "typeorm";
import { CreatePeopleTable1677713024356 } from "../migrations/1677713024356-CreatePeopleTable";

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Person],
    migrations: [CreatePeopleTable1677713024356],
})