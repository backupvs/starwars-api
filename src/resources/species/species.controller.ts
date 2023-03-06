import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { SpeciesService } from './species.service';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {}

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
}
