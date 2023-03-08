import "dotenv/config";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { Person } from "../resources/people/entities/person.entity";
import { Film } from "../resources/films/entities/film.entity";
import { Planet } from "../resources/planets/entities/planet.entity";
import { Species } from "../resources/species/entities/species.entity";
import { Vehicle } from "../resources/vehicles/entities/vehicle.entity";
import { Starship } from "../resources/starships/entities/starship.entity";
import { CreateTables1678291193882 } from "../database/migrations/1678291193882-CreateTables";

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Person, Film, Planet, Species, Vehicle, Starship],
    migrations: [CreateTables1678291193882],
})