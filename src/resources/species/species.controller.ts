import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../../images/images.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { SpeciesService } from './species.service';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
    constructor(
        private readonly speciesService: SpeciesService,
        private readonly imagesService: ImagesService
    ) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.speciesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.speciesService.findOne(Number(id));
    }

    @Post()
    create(@Body() createPersonDto: CreateSpeciesDto) {
        return this.speciesService.create(createPersonDto);
    }

    @Patch(':id')
    update(@Param('id', IdValidationPipe) id: string, @Body() updatePersonDto: UpdateSpeciesDto) {
        return this.speciesService.update(Number(id), updatePersonDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.speciesService.remove(Number(id));
    }

    @UseInterceptors(FileInterceptor('image-file'))
    @Post(':id/add-image')
    addImage(
        @Param('id', IdValidationPipe) id: string,
        @UploadedFile() imageFile: Express.Multer.File
    ) {
        return this.speciesService.addImage(Number(id), imageFile);
    }

    @Delete(':id/remove-image')
    removeImage(
        @Param('id', IdValidationPipe) id: string,
        @Query('id', IdValidationPipe) imageId: string
    ) {
        return this.imagesService.remove(Number(imageId));
    }
}
