import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ImagesService } from '../../images/images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../../common/pipes/file-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../users/entities/role.enum';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService,
        private readonly imagesService: ImagesService
    ) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.vehiclesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.vehiclesService.findOne(Number(id));
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles(Role.ADMIN)
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.create(createVehicleDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Patch(':id')
    @Roles(Role.ADMIN)
    update(@Param('id', IdValidationPipe) id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.update(Number(id), updateVehicleDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.vehiclesService.remove(Number(id));
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
        return this.vehiclesService.addImage(Number(id), imageFile);
    }
}
