import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        const relations = await this.preloadRelations(createVehicleDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const newVehicle = this.vehicleRepository.create({
            ...createVehicleDto,
            ...relations
        });

        return this.vehicleRepository.save(newVehicle);
    }

    async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
        const relations = await this.preloadRelations(updateVehicleDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const vehicle = await this.vehicleRepository.preload({
            id,
            ...updateVehicleDto,
            ...relations
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

    // Preload relations for vehicles
    async preloadRelations(vehicleDto: UpdateVehicleDto | CreateVehicleDto) {
        const pilots =
            vehicleDto.pilots &&
            (await Promise.all(
                vehicleDto.pilots.map(person => this.preloadPerson(person))
            ));

        const films =
            vehicleDto.films &&
            (await Promise.all(
                vehicleDto.films.map(film => this.preloadFilm(film))
            ));

        if (pilots?.includes(null) || films?.includes(null)) {
            return null
        }

        return { pilots, films };
    }

    preloadFilm(title: string): Promise<Film> {
        return this.filmRepository.findOneBy({ title });
    }

    preloadPerson(name: string): Promise<Person> {
        return this.personRepository.findOneBy({ name });
    }
}
