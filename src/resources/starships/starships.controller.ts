import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ImagesService } from '../../images/images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
    constructor(
        private readonly starshipsService: StarshipsService,
        private readonly imagesService: ImagesService
    ) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.starshipsService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.starshipsService.findOne(Number(id));
    }

    @Post()
    create(@Body() createStarshipDto: CreateStarshipDto) {
        return this.starshipsService.create(createStarshipDto);
    }

    @Patch(':id')
    update(@Param('id', IdValidationPipe) id: string, @Body() updateStarshipDto: UpdateStarshipDto) {
        return this.starshipsService.update(Number(id), updateStarshipDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.starshipsService.remove(Number(id));
    }

    @UseInterceptors(FileInterceptor('image-file'))
    @Post(':id/add-image')
    addImage(
        @Param('id', IdValidationPipe) id: string,
        @UploadedFile() imageFile: Express.Multer.File
    ) {
        return this.starshipsService.addImage(Number(id), imageFile);
    }

    @Delete(':id/remove-image')
    removeImage(
        @Param('id', IdValidationPipe) id: string,
        @Query('id', IdValidationPipe) imageId: string
    ) {
        return this.imagesService.remove(Number(imageId));
    }
}
