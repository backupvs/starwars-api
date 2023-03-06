import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Film } from '../films/entities/film.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from '../starships/entities/starship.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
        @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>,
        @InjectRepository(Species) private readonly speciesRepository: Repository<Species>,
        @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>
    ) {}

    findAll(paginationQuery: PaginationQueryDto): Promise<Person[]> {
        return this.personRepository.find({
            relations: {
                films: true,
                homeworld: true,
                species: true,
                vehicles: true,
                starships: true
            },
            skip: paginationQuery.offset,
            take: paginationQuery.limit,
        });
    }

    async findOne(id: number): Promise<Person> {
        const person = await this.personRepository.findOne({
            where: { id },
            relations: {
                films: true,
                homeworld: true,
                species: true,
                vehicles: true,
                starships: true
            }
        })

        if (!person) {
            throw new NotFoundException(`Person #${id} not found`);
        }

        return person;
    }

    async create(createPersonDto: CreatePersonDto): Promise<Person> {
        const relations = await this.preloadRelations(createPersonDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const newPerson = this.personRepository.create({
            ...createPersonDto,
            ...relations
        });

        return this.personRepository.save(newPerson);
    }

    async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
        const relations = await this.preloadRelations(updatePersonDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const person = await this.personRepository.preload({
            id,
            ...updatePersonDto,
            ...relations
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

    // Preload relations for people
    async preloadRelations(personDto: UpdatePersonDto | CreatePersonDto) {
        const films =
            personDto.films &&
            (await Promise.all(
                personDto.films.map(film => this.preloadFilm(film))
            ));

        const species =
            personDto.species &&
            (await Promise.all(
                personDto.species.map(species => this.preloadSpecies(species))
            ));

        const homeworld =
            personDto.homeworld &&
            await (this.preloadPlanet(personDto.homeworld));

        const vehicles =
            personDto.vehicles &&
            (await Promise.all(
                personDto.vehicles.map(vehicle => this.preloadVehicle(vehicle))
            ));

        const starships =
            personDto.starships &&
            (await Promise.all(
                personDto.starships.map(starship => this.preloadStarship(starship))
            ));

        if (
            films?.includes(null) ||
            species?.includes(null) || 
            vehicles?.includes(null) || 
            starships?.includes(null)
        ) {
            return null
        }

        return { films, species, vehicles, starships, homeworld };
    }

    preloadFilm(title: string): Promise<Film | null> {
        return this.filmRepository.findOneBy({ title });
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
