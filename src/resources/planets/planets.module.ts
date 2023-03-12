import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { Planet } from './entities/planet.entity';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { Image } from '../../images/entities/image.entity';
import { ImagesModule } from '../../images/images.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Planet,
            Person,
            Film,
            Image
        ]),
        ImagesModule
    ],
    controllers: [PlanetsController],
    providers: [PlanetsService],
    exports: [PlanetsService]
})
export class PlanetsModule {}
