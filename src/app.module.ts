import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './people/people.module';
import { DatabaseModule } from './database/database.module';
import { FilmsModule } from './films/films.module';
import { PlanetsModule } from './planets/planets.module';

@Module({
  imports: [
    PeopleModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    FilmsModule,
    PlanetsModule
  ]
})
export class AppModule {}
