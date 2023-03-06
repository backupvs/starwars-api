import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) {}

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
}
