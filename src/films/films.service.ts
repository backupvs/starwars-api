import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { CreatePersonDto } from '../people/dto/create-person.dto';

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>
    ) {}

    findAll(): Promise<Film[]> {
        return this.filmRepository.find({
            relations: {
                characters: true
            }
        });
    }

    async findOne(id: number): Promise<Film> {
        const film = await this.filmRepository.findOne({
            where: { id },
            relations: {
                characters: true
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

        const film = this.filmRepository.create({
            ...createFilmDto,
            characters
        });
        
        return this.filmRepository.save(film);
    }

    async update(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
        const characters =
            updateFilmDto.characters &&
            (await Promise.all(
                updateFilmDto.characters.map(person => this.preloadPerson(person))
            ))
        
        const film = await this.filmRepository.preload({
            id,
            ...updateFilmDto,
            characters
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
        const existingPerson= await this.personRepository.findOneBy({ name: createPersonDto.name });

        if (existingPerson) {
            return existingPerson;
        }

        return this.personRepository.create(createPersonDto);
    }
}
