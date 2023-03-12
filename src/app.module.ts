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
  ],
})
export class AppModule {}
