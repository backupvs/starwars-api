import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
    constructor(private readonly starshipsService: StarshipsService) {}

    @Get()
    findAll() {
        return this.starshipsService.findAll();
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
}
