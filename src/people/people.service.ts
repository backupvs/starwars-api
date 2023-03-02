import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { CreateFilmDto } from '../films/dto/create-film.dto';

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>
    ) {}

    findAll(): Promise<Person[]> {
        return this.personRepository.find({
            relations: {
                films: true
            }
        });
    }

    async findOne(id: number): Promise<Person> {
        const person = await this.personRepository.findOne({
            where: { id },
            relations: {
                films: true
            }
        })

        if (!person) {
            throw new NotFoundException(`Person #${id} not found`);
        }

        return person;
    }

    async create(createPersonDto: CreatePersonDto): Promise<Person> {
        const films = await Promise.all(
            createPersonDto.films.map(film => this.preloadFilm(film))
        )
        const newPerson = this.personRepository.create({
            ...createPersonDto,
            films
        });

        return this.personRepository.save(newPerson);
    }

    async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
        const films = 
            updatePersonDto.films &&
            (await Promise.all(
                updatePersonDto.films.map(film => this.preloadFilm(film))
            ));

        const person = await this.personRepository.preload({
            id,
            ...updatePersonDto,
            films
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
}
