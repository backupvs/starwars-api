import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../../images/images.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';

@ApiTags('people')
@Controller('people')
export class PeopleController {
    constructor(
        private readonly peopleService: PeopleService,
        private readonly imagesService: ImagesService
    ) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.peopleService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.peopleService.findOne(Number(id));
    }

    @Post()
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.peopleService.create(createPersonDto);
    }

    @Patch(':id')
    update(@Param('id', IdValidationPipe) id: string, @Body() updatePersonDto: UpdatePersonDto) {
        return this.peopleService.update(Number(id), updatePersonDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.peopleService.remove(Number(id));
    }

    @UseInterceptors(FileInterceptor('image-file'))
    @Post(':id/add-image')
    addImage(
        @Param('id', IdValidationPipe) id: string,
        @UploadedFile() imageFile: Express.Multer.File
    ) {
        return this.peopleService.addImage(Number(id), imageFile);
    }

    @Delete(':id/remove-image')
    removeImage(
        @Param('id', IdValidationPipe) id: string,
        @Query('id', IdValidationPipe) imageId: string
    ) {
        return this.imagesService.remove(Number(imageId));
    }
}
