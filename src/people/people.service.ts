import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>
    ) {}

    findAll(): Promise<Person[]> {
        return this.personRepository.find();
    }

    async findOne(id: number): Promise<Person> {
        const person = await this.personRepository.findOne({
            where: { id },
        })

        if (!person) {
            throw new NotFoundException(`People #${id} not found`);
        }

        return person;
    }

    async create(createPersonDto: CreatePersonDto): Promise<Person> {
        const newPerson = this.personRepository.create(createPersonDto);

        return this.personRepository.save(newPerson);
    }

    async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
        const person = await this.personRepository.preload({
            id,
            ...updatePersonDto
        });

        if (!person) {
            throw new NotFoundException(`People #${id} not found`);
        }

        return this.personRepository.save(person);
    }

    async remove(id: number): Promise<Person> {
        const person = await this.findOne(id);

        return this.personRepository.remove(person);
    }
}
