import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './people/people.module';
import { DatabaseModule } from './database/database.module';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [
    PeopleModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    FilmsModule
  ]
})
export class AppModule {}
