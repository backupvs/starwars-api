import { Injectable, NotFoundException } from '@nestjs/common';
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
                people: true
            }
        });
    }

    async findOne(id: number): Promise<Species> {
        const species = await this.speciesRepository.findOne({
            where: { id },
            relations: {
                homeworld: true,
                people: true
            }
        })

        if (!species) {
            throw new NotFoundException(`Species #${id} not found`);
        }

        return species;
    }

    async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
        const homeworld = await this.preloadPlanet(createSpeciesDto.homeworld);
        const people = await Promise.all(
            createSpeciesDto.people.map(person => this.preloadPerson(person))
        )

        const newSpecies = this.speciesRepository.create({
            ...createSpeciesDto,
            homeworld,
            people
        });

        return this.speciesRepository.save(newSpecies);
    }

    async update(id: number, updateSpeciesDto: UpdateSpeciesDto): Promise<Species> {
        const homeworld =
            updateSpeciesDto.homeworld &&
            await (this.preloadPlanet(updateSpeciesDto.homeworld));
        const people =
            updateSpeciesDto.people &&
            (await Promise.all(
                updateSpeciesDto.people.map(person => this.preloadPerson(person))
            ))

        const species = await this.speciesRepository.preload({
            id,
            ...updateSpeciesDto,
            homeworld,
            people
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

    async preloadPlanet(createPlanetDto: CreatePlanetDto): Promise<Planet> {
        const existingPlanet = await this.planetRepository.findOneBy({ name: createPlanetDto.name });

        if (existingPlanet) {
            return existingPlanet;
        }

        return this.planetRepository.create(createPlanetDto);
    }

    async preloadPerson(createPersonDto: CreatePersonDto): Promise<Person> {
        const existingPerson = await this.personRepository.findOneBy({ name: createPersonDto.name });

        if (existingPerson) {
            return existingPerson;
        }

        return this.personRepository.create(createPersonDto);
    }
}
