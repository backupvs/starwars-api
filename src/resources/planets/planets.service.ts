import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>
    ) {}

    findAll(paginationQuery: PaginationQueryDto): Promise<Planet[]> {
        return this.planetRepository.find({
            relations: {
                residents: true,
                films: true
            },
            skip: paginationQuery.offset,
            take: paginationQuery.limit
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
        const relations = await this.preloadRelations(createPlanetDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const newPlanet = this.planetRepository.create({
            ...createPlanetDto,
            ...relations
        });

        return this.planetRepository.save(newPlanet);
    }

    async update(id: number, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
        const relations = await this.preloadRelations(updatePlanetDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const planet = await this.planetRepository.preload({
            id,
            ...updatePlanetDto,
            ...relations
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

    // Preload relations for planets
    async preloadRelations(planetDto: UpdatePlanetDto | CreatePlanetDto) {
        const residents =
            planetDto.residents &&
            (await Promise.all(
                planetDto.residents.map(person => this.preloadPerson(person))
            ));

        const films =
            planetDto.films &&
            (await Promise.all(
                planetDto.films.map(film => this.preloadFilm(film))
            ));

        if (residents?.includes(null) || films?.includes(null)) {
            return null
        }

        return { residents, films };
    }


    preloadPerson(name: string): Promise<Person | null> {
        return this.personRepository.findOneBy({ name });
    }

    preloadFilm(title: string): Promise<Film | null> {
        return this.filmRepository.findOneBy({ title });
    }
}
