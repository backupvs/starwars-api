import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Film } from '../../resources/films/entities/film.entity';
import { Person } from '../../resources/people/entities/person.entity';
import { Planet } from '../../resources/planets/entities/planet.entity';
import { Species } from '../../resources/species/entities/species.entity';
import { Starship } from '../../resources/starships/entities/starship.entity';
import { Vehicle } from '../../resources/vehicles/entities/vehicle.entity';
import { PeopleModule } from '../../resources/people/people.module';
import { FilmsModule } from '../../resources/films/films.module';
import { PlanetsModule } from '../../resources/planets/planets.module';
import { SpeciesModule } from '../../resources/species/species.module';
import { StarshipsModule } from '../../resources/starships/starships.module';
import { VehiclesModule } from '../../resources/vehicles/vehicles.module';
import { PeopleService } from '../../resources/people/people.service';
import { FilmsService } from '../../resources/films/films.service';
import { PlanetsService } from '../../resources/planets/planets.service';
import { SpeciesService } from '../../resources/species/species.service';
import { StarshipsService } from '../../resources/starships/starships.service';
import { VehiclesService } from '../../resources/vehicles/vehicles.service';
import { HttpModule } from '@nestjs/axios';
import { SeedCommand } from './seed.command';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Person,
            Film,
            Planet,
            Species,
            Starship,
            Vehicle
        ]),
        PeopleModule,
        FilmsModule,
        PlanetsModule,
        SpeciesModule,
        StarshipsModule,
        VehiclesModule,
        HttpModule
    ],
    providers: [
        SeederService,
        PeopleService,
        FilmsService,
        PlanetsService,
        SpeciesService,
        StarshipsService,
        VehiclesService,
        SeedCommand,
    ]
})
export class SeederModule {}
