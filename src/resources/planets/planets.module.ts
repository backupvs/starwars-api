import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { Planet } from './entities/planet.entity';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Planet,
            Person,
            Film
        ])],
    controllers: [PlanetsController],
    providers: [PlanetsService],
    exports: [PlanetsService]
})
export class PlanetsModule {}
