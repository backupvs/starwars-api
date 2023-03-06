import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { PlanetsService } from './planets.service';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
    constructor(private readonly planetsService: PlanetsService) {}

    @Get()
    findAll() {
        return this.planetsService.findAll();
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
}
