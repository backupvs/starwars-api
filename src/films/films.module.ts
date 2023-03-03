import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Film,
      Person,
      Planet,
      Species
    ])
  ],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule {}
