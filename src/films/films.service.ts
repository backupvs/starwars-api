import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import UpdateFilmDto from './dto/update-film.dto';
import { Film } from './entities/Film.entity';

@Injectable()
export class FilmsService {
    constructor(@InjectRepository(Film) private readonly filmRepository: Repository<Film>) {}

    findAll(): Promise<Film[]> {
        return this.filmRepository.find();
    }

    async findOne(id: number): Promise<Film> {
        const film = await this.filmRepository.findOne({
            where: { id }
        });

        if (!film) {
            throw new NotFoundException(`Film #${id} not found`);
        }

        return film;
    }

    create(createFilmDto: CreateFilmDto): Promise<Film> {
        const film = this.filmRepository.create(createFilmDto);
        
        return this.filmRepository.save(film);
    }

    async update(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
        const film = await this.filmRepository.preload({
            id,
            ...updateFilmDto
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
}
