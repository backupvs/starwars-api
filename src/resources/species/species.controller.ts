import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../../images/images.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { SpeciesService } from './species.service';
import { FileValidationPipe } from '../../common/pipes/file-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../users/entities/role.enum';

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

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles(Role.ADMIN)
    create(@Body() createPersonDto: CreateSpeciesDto) {
        return this.speciesService.create(createPersonDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Patch(':id')
    @Roles(Role.ADMIN)
    update(@Param('id', IdValidationPipe) id: string, @Body() updatePersonDto: UpdateSpeciesDto) {
        return this.speciesService.update(Number(id), updatePersonDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.speciesService.remove(Number(id));
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                ['image-file']: {
                    type: 'string',
                    format: 'binary',
                    description: 'The image file to upload'
                },
            },
            required: ['image-file']
        },
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UseInterceptors(FileInterceptor('image-file'))
    @Post(':id/add-image')
    @Roles(Role.ADMIN)
    addImage(
        @Param('id', IdValidationPipe) id: string,
        @UploadedFile(FileValidationPipe) imageFile: Express.Multer.File
    ) {
        return this.speciesService.addImage(Number(id), imageFile);
    }
}
