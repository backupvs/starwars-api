import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './resources/people/people.module';
import { DatabaseModule } from './database/database.module';
import { FilmsModule } from './resources/films/films.module';
import { PlanetsModule } from './resources/planets/planets.module';
import { SpeciesModule } from './resources/species/species.module';
import { VehiclesModule } from './resources/vehicles/vehicles.module';
import { StarshipsModule } from './resources/starships/starships.module';
import { SeederModule } from './database/seeder/seeder.module';
import { CommandModule } from 'nestjs-command';
import { TruncateDataCommand } from './database/commands/truncate-data.command';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommandModule,
    PeopleModule,
    DatabaseModule,
    FilmsModule,
    PlanetsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
    SeederModule,
  ],
  providers: [
    TruncateDataCommand,
  ]
})
export class AppModule {}
