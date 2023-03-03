import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { SpeciesService } from './species.service';

@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {}

    @Get()
    findAll() {
        return this.speciesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.speciesService.findOne(Number(id));
    }

    @Post()
    create(@Body() createPersonDto: CreateSpeciesDto) {
        return this.speciesService.create(createPersonDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePersonDto: UpdateSpeciesDto) {
        return this.speciesService.update(Number(id), updatePersonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.speciesService.remove(Number(id));
    }
}
