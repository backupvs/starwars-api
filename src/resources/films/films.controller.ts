import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../../images/images.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { FilmsService } from './films.service';
import { FileValidationPipe } from '../../common/pipes/file-validation.pipe';

@ApiTags('films')
@Controller('films')
export class FilmsController {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly imagesService: ImagesService
    ) {}

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

    @UseInterceptors(FileInterceptor('image-file'))
    @Post(':id/add-image')
    addImage(
        @Param('id', IdValidationPipe) id: string,
        @UploadedFile(FileValidationPipe) imageFile: Express.Multer.File
    ) {
        return this.filmsService.addImage(Number(id), imageFile);
    }

    @Delete(':id/remove-image')
    removeImage(
        @Param('id', IdValidationPipe) id: string,
        @Query('id', IdValidationPipe) imageId: string
    ) {
        return this.imagesService.remove(Number(imageId));
    }
}
