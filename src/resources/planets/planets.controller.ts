import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { PlanetsService } from './planets.service';
import { FileValidationPipe } from '../../common/pipes/file-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../users/entities/role.enum';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
    constructor(
        private readonly planetsService: PlanetsService,
    ) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.planetsService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.planetsService.findOne(Number(id));
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles(Role.ADMIN)
    create(@Body() createPlanetDto: CreatePlanetDto) {
        return this.planetsService.create(createPlanetDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Patch(':id')
    @Roles(Role.ADMIN)
    update(@Param('id', IdValidationPipe) id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
        return this.planetsService.update(Number(id), updatePlanetDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.planetsService.remove(Number(id));
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
        return this.planetsService.addImage(Number(id), imageFile);
    }
}
