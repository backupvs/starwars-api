import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './resources/people/people.module';
import { DatabaseModule } from './database/database.module';
import { FilmsModule } from './resources/films/films.module';
import { PlanetsModule } from './resources/planets/planets.module';
import { SpeciesModule } from './resources/species/species.module';
import { VehiclesModule } from './resources/vehicles/vehicles.module';
import { StarshipsModule } from './resources/starships/starships.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PeopleModule,
    DatabaseModule,
    FilmsModule,
    PlanetsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule
  ]
})
export class AppModule {}
