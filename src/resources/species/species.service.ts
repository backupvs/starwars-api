import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanetDto } from '../planets/dto/create-planet.dto';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { CreatePersonDto } from '../people/dto/create-person.dto';

@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Species) private readonly speciesRepository: Repository<Species>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
        @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>
    ) {}

    findAll(): Promise<Species[]> {
        return this.speciesRepository.find({
            relations: {
                homeworld: true,
                people: true,
                films: true
            }
        });
    }

    async findOne(id: number): Promise<Species> {
        const species = await this.speciesRepository.findOne({
            where: { id },
            relations: {
                homeworld: true,
                people: true,
                films: true
            }
        })

        if (!species) {
            throw new NotFoundException(`Species #${id} not found`);
        }

        return species;
    }

    async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
        const relations = await this.preloadRelations(createSpeciesDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const newSpecies = this.speciesRepository.create({
            ...createSpeciesDto,
            ...relations
        });

        return this.speciesRepository.save(newSpecies);
    }

    async update(id: number, updateSpeciesDto: UpdateSpeciesDto): Promise<Species> {
        const relations = await this.preloadRelations(updateSpeciesDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const species = await this.speciesRepository.preload({
            id,
            ...updateSpeciesDto,
            ...relations
        });

        if (!species) {
            throw new NotFoundException(`Species #${id} not found`);
        }

        return this.speciesRepository.save(species);
    }

    async remove(id: number): Promise<Species> {
        const species = await this.findOne(id);

        return this.speciesRepository.remove(species);
    }

    // Preload relations for species
    async preloadRelations(speciesDto: UpdateSpeciesDto | CreateSpeciesDto) {
        const people =
            speciesDto.people &&
            (await Promise.all(
                speciesDto.people.map(person => this.preloadPerson(person))
            ));

        const films =
            speciesDto.films &&
            (await Promise.all(
                speciesDto.films.map(film => this.preloadFilm(film))
            ));

        const homeworld =
        speciesDto.homeworld &&
            await (this.preloadPlanet(speciesDto.homeworld));

        if (
            people?.includes(null) || 
            films?.includes(null) || 
            homeworld === null
        ) {
            return null
        }

        return { people, films, homeworld };
    }

    preloadPlanet(name: string): Promise<Planet | null> {
        return this.planetRepository.findOneBy({ name });
    }

    preloadPerson(name: string): Promise<Person | null> {
        return this.personRepository.findOneBy({ name });
    }

    preloadFilm(title: string): Promise<Film | null> {
        return this.filmRepository.findOneBy({ title });
    }
}
