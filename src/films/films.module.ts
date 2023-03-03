import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Person, Planet])],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule {}
