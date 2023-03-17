import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { PeopleModule } from './resources/people/people.module';
import { DatabaseModule } from './database/database.module';
import { FilmsModule } from './resources/films/films.module';
import { PlanetsModule } from './resources/planets/planets.module';
import { SpeciesModule } from './resources/species/species.module';
import { VehiclesModule } from './resources/vehicles/vehicles.module';
import { StarshipsModule } from './resources/starships/starships.module';
import { SeederModule } from './database/seeder/seeder.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CommandModule,
        ImagesModule,
        PeopleModule,
        DatabaseModule,
        FilmsModule,
        PlanetsModule,
        SpeciesModule,
        VehiclesModule,
        StarshipsModule,
        SeederModule,
        AuthModule,
        UsersModule,
    ]
})
export class AppModule {}
