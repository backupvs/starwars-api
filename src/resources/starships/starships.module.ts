import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Starship,
      Person,
      Film
    ])
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
  exports: [StarshipsService]
})
export class StarshipsModule {}
