import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ImagesService } from '../../images/images.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Post()
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.create(createVehicleDto);
    }

    @Patch(':id')
    update(@Param('id', IdValidationPipe) id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.update(Number(id), updateVehicleDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.vehiclesService.remove(Number(id));
    }

    @UseInterceptors(FileInterceptor('image-file'))
    @Post(':id/add-image')
    addImage(
        @Param('id', IdValidationPipe) id: string,
        @UploadedFile() imageFile: Express.Multer.File
    ) {
        return this.vehiclesService.addImage(Number(id), imageFile);
    }

    @Delete(':id/remove-image')
    removeImage(
        @Param('id', IdValidationPipe) id: string,
        @Query('id', IdValidationPipe) imageId: string
    ) {
        return this.imagesService.remove(Number(imageId));
    }
}
