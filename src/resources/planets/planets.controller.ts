import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../../images/images.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { PlanetsService } from './planets.service';
import { FileValidationPipe } from '../../common/pipes/file-validation.pipe';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
    constructor(
        private readonly planetsService: PlanetsService,
        private readonly imagesService: ImagesService
    ) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.planetsService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.planetsService.findOne(Number(id));
    }

    @Post()
    create(@Body() createPlanetDto: CreatePlanetDto) {
        return this.planetsService.create(createPlanetDto);
    }

    @Patch(':id')
    update(@Param('id', IdValidationPipe) id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
        return this.planetsService.update(Number(id), updatePlanetDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.planetsService.remove(Number(id));
    }

    @UseInterceptors(FileInterceptor('image-file'))
    @Post(':id/add-image')
    addImage(
        @Param('id', IdValidationPipe) id: string,
        @UploadedFile(FileValidationPipe) imageFile: Express.Multer.File
    ) {
        return this.planetsService.addImage(Number(id), imageFile);
    }

    @Delete(':id/remove-image')
    removeImage(
        @Param('id', IdValidationPipe) id: string,
        @Query('id', IdValidationPipe) imageId: string
    ) {
        return this.imagesService.remove(Number(imageId));
    }
}
