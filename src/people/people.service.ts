import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/Person.entity';

@Injectable()
export class PeopleService {
    private lastPersonId = 0;
    private people: Person[] = [];

    findAll() {
        return this.people;
    }


    findOne(id: number) {
        const person = this.people.find(person => person.id === id);
        if (!person) {
            throw new NotFoundException(`People #${id} not found`);
        }
        return person;
    }

    create(createPersonDto: CreatePersonDto) {
        const newPerson = {
            id: ++this.lastPersonId,
            ...createPersonDto
        }
        this.people.push(newPerson);
        return createPersonDto;
    }

    update(id: number, updatePersonDto: UpdatePersonDto) {
        const person = this.findOne(id);
        return '*updated*';
    }

    remove(id: number) {
        const index = this.people.findIndex(person => person.id === id);
        if (index > -1) {
            this.people.splice(index, 1);
            return `Removed #${id}`;
        } else {
            throw new NotFoundException(`People #${id} not found`);
        }
    }
}
