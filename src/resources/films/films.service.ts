import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { CreatePersonDto } from '../people/dto/create-person.dto';
import { Planet } from '../planets/entities/planet.entity';
import { CreatePlanetDto } from '../planets/dto/create-planet.dto';
import { CreateSpeciesDto } from '../species/dto/create-species.dto';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { CreateVehicleDto } from '../vehicles/dto/create-vehicle.dto';

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>,
        @InjectRepository(Species) private readonly speciesRepository: Repository<Species>,
        @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>
    ) {}

    findAll(): Promise<Film[]> {
        return this.filmRepository.find({
            relations: {
                characters: true,
                planets: true,
                species: true,
                vehicles: true
            }
        });
    }

    async findOne(id: number): Promise<Film> {
        const film = await this.filmRepository.findOne({
            where: { id },
            relations: {
                characters: true,
                planets: true,
                species: true,
                vehicles: true
            }
        });

        if (!film) {
            throw new NotFoundException(`Film #${id} not found`);
        }

        return film;
    }

    async create(createFilmDto: CreateFilmDto): Promise<Film> {
        const characters = await Promise.all(
            createFilmDto.characters.map(person => this.preloadPerson(person))
        )
        const planets = await Promise.all(
            createFilmDto.planets.map(planet => this.preloadPlanet(planet))
        )
        const species = await Promise.all(
            createFilmDto.species.map(species => this.preloadSpecies(species)),
        )
        const vehicles = await Promise.all(
            createFilmDto.vehicles.map(vehicle => this.preloadVehicle(vehicle)),
        )

        const film = this.filmRepository.create({
            ...createFilmDto,
            characters,
            planets,
            species,
            vehicles
        });

        return this.filmRepository.save(film);
    }

    async update(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
        const characters =
            updateFilmDto.characters &&
            (await Promise.all(
                updateFilmDto.characters.map(person => this.preloadPerson(person))
            ))
        const planets =
            updateFilmDto.planets &&
            (await Promise.all(
                updateFilmDto.planets.map(planet => this.preloadPlanet(planet))
            ))
        const species =
            updateFilmDto.species &&
            (await Promise.all(
                updateFilmDto.species.map(species => this.preloadSpecies(species))
            ));
        const vehicles =
            updateFilmDto.vehicles &&
            (await Promise.all(
                updateFilmDto.vehicles.map(vehicle => this.preloadVehicle(vehicle))
            ));

        const film = await this.filmRepository.preload({
            id,
            ...updateFilmDto,
            characters,
            planets,
            species,
            vehicles
        });

        if (!film) {
            throw new NotFoundException(`Film #${id} not found`);
        }

        return this.filmRepository.save(film);
    }

    async remove(id: number): Promise<Film> {
        const film = await this.findOne(id);

        return this.filmRepository.remove(film);
    }

    async preloadPerson(createPersonDto: CreatePersonDto): Promise<Person> {
        const existingPerson = await this.personRepository.findOneBy({ name: createPersonDto.name });

        if (existingPerson) {
            return existingPerson;
        }

        return this.personRepository.create(createPersonDto);
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
