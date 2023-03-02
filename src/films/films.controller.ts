import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import UpdateFilmDto from './dto/update-film.dto';
import { Film } from './entities/Film.entity';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    findAll(): Promise<Film[]> {
        return this.filmsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Film> {
        return this.filmsService.findOne(Number(id));
    }

    @Post()
    create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
        return this.filmsService.create(createFilmDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto): Promise<Film> {
        return this.filmsService.update(Number(id), updateFilmDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Film> {
        return this.filmsService.remove(Number(id));
    }
}
