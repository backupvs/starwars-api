import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Person } from '../people/entities/person.entity';
import { CreatePersonDto } from '../people/dto/create-person.dto';
import { Film } from '../films/entities/film.entity';
import { CreateFilmDto } from '../films/dto/create-film.dto';

@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>
    ) {}

    findAll(): Promise<Planet[]> {
        return this.planetRepository.find({
            relations: {
                residents: true,
                films: true
            }
        });
    }

    async findOne(id: number): Promise<Planet> {
        const planet = await this.planetRepository.findOne({
            where: { id },
            relations: {
                residents: true,
                films: true
            }
        })

        if (!planet) {
            throw new NotFoundException(`Planet #${id} not found`);
        }

        return planet;
    }

    async create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
        const residents = await Promise.all(
            createPlanetDto.residents.map(person => this.preloadPerson(person))
        )
        const films = await Promise.all(
            createPlanetDto.films.map(film => this.preloadFilm(film)),
        )

        const newPlanet = this.planetRepository.create({
            ...createPlanetDto,
            residents,
            films
        });

        return this.planetRepository.save(newPlanet);
    }

    async update(id: number, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
        const residents =
            updatePlanetDto.residents &&
            (await Promise.all(
                updatePlanetDto.residents.map(person => this.preloadPerson(person))
            ))
        const films =
            updatePlanetDto.films &&
            (await Promise.all(
                updatePlanetDto.films.map(film => this.preloadFilm(film)),
            ))

        const planet = await this.planetRepository.preload({
            id,
            ...updatePlanetDto,
            residents,
            films
        });

        if (!planet) {
            throw new NotFoundException(`Planet #${id} not found`);
        }

        return this.planetRepository.save(planet);
    }

    async remove(id: number): Promise<Planet> {
        const planet = await this.findOne(id);

        return this.planetRepository.remove(planet);
    }

    async preloadPerson(createPersonDto: CreatePersonDto): Promise<Person> {
        const existingPerson = await this.personRepository.findOneBy({ name: createPersonDto.name });

        if (existingPerson) {
            return existingPerson;
        }

        return this.personRepository.create(createPersonDto);
    }

    async preloadFilm(createFilmDto: CreateFilmDto): Promise<Film> {
        const existingFilm = await this.filmRepository.findOneBy({ title: createFilmDto.title });

        if (existingFilm) {
            return existingFilm;
        }

        return this.filmRepository.create(createFilmDto);
    }
}
