import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Vehicle,
        Person,
        Film
      ]
    )
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService]
})
export class VehiclesModule {}
