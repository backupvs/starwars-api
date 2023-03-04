import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilmDto } from '../films/dto/create-film.dto';
import { Film } from '../films/entities/film.entity';
import { CreatePersonDto } from '../people/dto/create-person.dto';
import { Person } from '../people/entities/person.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    ) {}

    findAll(): Promise<Vehicle[]> {
        return this.vehicleRepository.find({
            relations: {
                films: true,
                pilots: true
            }
        });
    }

    async findOne(id: number): Promise<Vehicle> {
        const vehicle = await this.vehicleRepository.findOne({
            where: { id },
            relations: {
                films: true,
                pilots: true
            }
        })

        if (!vehicle) {
            throw new NotFoundException(`Vehicle #${id} not found`);
        }

        return vehicle;
    }

    async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const films = await Promise.all(
            createVehicleDto.films.map(film => this.preloadFilm(film)),
        )
        const pilots = await Promise.all(
            createVehicleDto.pilots.map(person => this.preloadPerson(person))
        )

        const newVehicle = this.vehicleRepository.create({
            ...createVehicleDto,
            films,
            pilots
        });

        return this.vehicleRepository.save(newVehicle);
    }

    async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
        const films =
            updateVehicleDto.films &&
            (await Promise.all(
                updateVehicleDto.films.map(film => this.preloadFilm(film))
            ));
        const pilots =
            updateVehicleDto.pilots &&
            (await Promise.all(
                updateVehicleDto.pilots.map(person => this.preloadPerson(person))
            ))

        const vehicle = await this.vehicleRepository.preload({
            id,
            ...updateVehicleDto,
            films,
            pilots
        });

        if (!vehicle) {
            throw new NotFoundException(`Vehicle #${id} not found`);
        }

        return this.vehicleRepository.save(vehicle);
    }

    async remove(id: number): Promise<Vehicle> {
        const vehicle = await this.findOne(id);

        return this.vehicleRepository.remove(vehicle);
    }

    async preloadFilm(createFilmDto: CreateFilmDto): Promise<Film> {
        const existingFilm = await this.filmRepository.findOneBy({ title: createFilmDto.title });

        if (existingFilm) {
            return existingFilm;
        }

        return this.filmRepository.create(createFilmDto);
    }

    async preloadPerson(createPersonDto: CreatePersonDto): Promise<Person> {
        const existingPerson = await this.personRepository.findOneBy({ name: createPersonDto.name });

        if (existingPerson) {
            return existingPerson;
        }

        return this.personRepository.create(createPersonDto);
    }
}
