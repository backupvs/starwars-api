import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { FilmsService } from './films.service';

@ApiTags('films')
@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Film[]> {
        return this.filmsService.findAll(paginationQuery);
    }

    @Get(':id')
    async findOne(@Param('id', IdValidationPipe) id: string): Promise<Film> {
        return this.filmsService.findOne(Number(id));
    }

    @Post()
    create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
        return this.filmsService.create(createFilmDto);
    }

    @Patch(':id')
    async update(@Param('id', IdValidationPipe) id: string, @Body() updateFilmDto: UpdateFilmDto): Promise<Film> {
        return this.filmsService.update(Number(id), updateFilmDto);
    }

    @Delete(':id')
    async remove(@Param('id', IdValidationPipe) id: string): Promise<Film> {
        return this.filmsService.remove(Number(id));
    }
}
