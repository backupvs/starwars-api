import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Film } from '../films/entities/film.entity';
import { CreateFilmDto } from '../films/dto/create-film.dto';
import { Planet } from '../planets/entities/planet.entity';
import { CreatePlanetDto } from '../planets/dto/create-planet.dto';
import { CreateSpeciesDto } from '../species/dto/create-species.dto';
import { Species } from '../species/entities/species.entity';
import { CreateVehicleDto } from '../vehicles/dto/create-vehicle.dto';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
        @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>,
        @InjectRepository(Species) private readonly speciesRepository: Repository<Species>,
        @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>
    ) {}

    findAll(): Promise<Person[]> {
        return this.personRepository.find({
            relations: {
                films: true,
                homeworld: true,
                species: true,
                vehicles: true
            }
        });
    }

    async findOne(id: number): Promise<Person> {
        const person = await this.personRepository.findOne({
            where: { id },
            relations: {
                films: true,
                homeworld: true,
                species: true,
                vehicles: true
            }
        })

        if (!person) {
            throw new NotFoundException(`Person #${id} not found`);
        }

        return person;
    }

    async create(createPersonDto: CreatePersonDto): Promise<Person> {
        const films = await Promise.all(
            createPersonDto.films.map(film => this.preloadFilm(film)),
        )
        const species = await Promise.all(
            createPersonDto.species.map(species => this.preloadSpecies(species)),
        )
        const vehicles = await Promise.all(
            createPersonDto.vehicles.map(vehicle => this.preloadVehicle(vehicle)),
        )
        const homeworld = await this.preloadPlanet(createPersonDto.homeworld);

        const newPerson = this.personRepository.create({
            ...createPersonDto,
            films,
            homeworld,
            species,
            vehicles
        });

        return this.personRepository.save(newPerson);
    }

    async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
        const films =
            updatePersonDto.films &&
            (await Promise.all(
                updatePersonDto.films.map(film => this.preloadFilm(film))
            ));
        const species =
            updatePersonDto.species &&
            (await Promise.all(
                updatePersonDto.species.map(species => this.preloadSpecies(species))
            ));
        const homeworld =
            updatePersonDto.homeworld &&
            await (this.preloadPlanet(updatePersonDto.homeworld));
        const vehicles =
            updatePersonDto.vehicles &&
            (await Promise.all(
                updatePersonDto.vehicles.map(vehicle => this.preloadVehicle(vehicle))
            ));

        const person = await this.personRepository.preload({
            id,
            ...updatePersonDto,
            films,
            homeworld,
            species,
            vehicles
        });

        if (!person) {
            throw new NotFoundException(`Person #${id} not found`);
        }

        return this.personRepository.save(person);
    }

    async remove(id: number): Promise<Person> {
        const person = await this.findOne(id);

        return this.personRepository.remove(person);
    }

    async preloadFilm(createFilmDto: CreateFilmDto): Promise<Film> {
        const existingFilm = await this.filmRepository.findOneBy({ title: createFilmDto.title });

        if (existingFilm) {
            return existingFilm;
        }

        return this.filmRepository.create(createFilmDto);
    }

    async preloadPlanet(createPlanetDto: CreatePlanetDto): Promise<Planet> {
        const existingPlanet = await this.planetRepository.findOneBy({ name: createPlanetDto.name });

        if (existingPlanet) {
            return existingPlanet;
        }

        return this.planetRepository.create(createPlanetDto);
    }

    async preloadSpecies(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
        const existingSpecies = await this.speciesRepository.findOneBy({ name: createSpeciesDto.name });

        if (existingSpecies) {
            return existingSpecies;
        }

        return this.speciesRepository.create(createSpeciesDto);
    }

    async preloadVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const existingVehicle = await this.vehicleRepository.findOneBy({ name: createVehicleDto.name });

        if (existingVehicle) {
            return existingVehicle;
        }

        return this.vehicleRepository.create(createVehicleDto);
    }
}
