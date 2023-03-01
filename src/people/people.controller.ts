import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Get()
    findAll() {
        return this.peopleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.peopleService.findOne(Number(id));
    }

    @Post()
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.peopleService.create(createPersonDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updatePersonDto: UpdatePersonDto) {
        return this.peopleService.update(Number(id), updatePersonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.peopleService.remove(Number(id));
    }
}
