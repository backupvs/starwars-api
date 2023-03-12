import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Image } from '../../images/entities/image.entity';
import { ImagesModule } from '../../images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Vehicle,
        Person,
        Film,
        Image
      ]
    ),
    ImagesModule
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService]
})
export class VehiclesModule {}
