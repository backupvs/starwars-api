import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../people/entities/person.entity';
import { Film } from './entities/film.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Person])],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule {}
