import "dotenv/config";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { Person } from "../resources/people/entities/person.entity";
import { Film } from "../resources/films/entities/film.entity";
import { Planet } from "../resources/planets/entities/planet.entity";
import { Species } from "../resources/species/entities/species.entity";
import { Vehicle } from "../resources/vehicles/entities/vehicle.entity";
import { Starship } from "../resources/starships/entities/starship.entity";
import { Image } from "../images/entities/image.entity";
import { User } from "../users/entities/User.entity";
import { CreateTables1678291193882 } from "../database/migrations/1678291193882-CreateTables";
import { CreateImagesTable1678579668503 } from "../database/migrations/1678579668503-CreateImagesTable";
import { CreateUsersTable1678742302144 } from "../database/migrations/1678742302144-CreateUsersTable";

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [
        Person, Film,
        Planet, Species,
        Vehicle, Starship,
        Image, User
    ],
    migrations: [
        CreateTables1678291193882, CreateImagesTable1678579668503,
        CreateUsersTable1678742302144
    ],
})