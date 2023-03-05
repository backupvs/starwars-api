import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from '../starships/entities/starship.entity';

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>,
        @InjectRepository(Species) private readonly speciesRepository: Repository<Species>,
        @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>
    ) {}

    findAll(): Promise<Film[]> {
        return this.filmRepository.find({
            relations: {
                characters: true,
                planets: true,
                species: true,
                vehicles: true,
                starships: true
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
                vehicles: true,
                starships: true
            }
        });

        if (!film) {
            throw new NotFoundException(`Film #${id} not found`);
        }

        return film;
    }

    async create(createFilmDto: CreateFilmDto): Promise<Film> {
        const relations = await this.preloadRelations(createFilmDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const film = this.filmRepository.create({
            ...createFilmDto,
            ...relations
        });

        return this.filmRepository.save(film);
    }

    async update(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
        const relations = await this.preloadRelations(updateFilmDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const film = await this.filmRepository.preload({
            id,
            ...updateFilmDto,
            ...relations
        });

        if (!film) {
            throw new NotFoundException(`Film #${id} not found`);
        }

        return this.filmRepository.save(film);
    }

    // Preload relations for films
    async preloadRelations(filmDto: UpdateFilmDto | CreateFilmDto) {
        const characters =
            filmDto.characters &&
            (await Promise.all(
                filmDto.characters.map(person => this.preloadPerson(person))
            ));

        const species =
            filmDto.species &&
            (await Promise.all(
                filmDto.species.map(species => this.preloadSpecies(species))
            ));

        const planets =
            filmDto.planets &&
            (await Promise.all(
                filmDto.planets.map(planet => this.preloadPlanet(planet))
            ));

        const vehicles =
            filmDto.vehicles &&
            (await Promise.all(
                filmDto.vehicles.map(vehicle => this.preloadVehicle(vehicle))
            ));

        const starships =
            filmDto.starships &&
            (await Promise.all(
                filmDto.starships.map(starship => this.preloadStarship(starship))
            ));

        if (
            characters?.includes(null) || 
            species?.includes(null) || 
            vehicles?.includes(null) || 
            starships?.includes(null) || 
            planets?.includes(null)
        ) {
            return null
        }

        return { characters, species, vehicles, starships, planets };
    }

    async remove(id: number): Promise<Film> {
        const film = await this.findOne(id);

        return this.filmRepository.remove(film);
    }

    async preloadPerson(name: string): Promise<Person | null> {
        return this.personRepository.findOneBy({ name });
    }

    preloadPlanet(name: string): Promise<Planet | null> {
        return this.planetRepository.findOneBy({ name });
    }

    preloadSpecies(name: string): Promise<Species | null> {
        return this.speciesRepository.findOneBy({ name });
    }

    preloadVehicle(name: string): Promise<Vehicle | null> {
        return this.vehicleRepository.findOneBy({ name });
    }

    preloadStarship(name: string): Promise<Starship | null> {
        return this.starshipRepository.findOneBy({ name });
    }
}
