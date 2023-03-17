import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Image } from '../../images/entities/image.entity';
import { ImagesModule } from '../../images/images.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Film,
            Person,
            Planet,
            Species,
            Vehicle,
            Starship,
            Image
        ]),
        ImagesModule
    ],
    controllers: [FilmsController],
    providers: [FilmsService],
    exports: [FilmsService]
})
export class FilmsModule {}
