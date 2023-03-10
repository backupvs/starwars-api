import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from './entities/species.entity';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { Image } from '../../images/entities/image.entity';
import { ImagesModule } from '../../images/images.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Species,
            Planet,
            Person,
            Film,
            Image
        ]),
        ImagesModule
    ],
    controllers: [SpeciesController],
    providers: [SpeciesService],
    exports: [SpeciesService]
})
export class SpeciesModule {}
