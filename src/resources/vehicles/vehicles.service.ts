import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { ImagesService } from '../../images/images.service';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
        private readonly imagesService: ImagesService
    ) {}

    findAll(paginationQuery: PaginationQueryDto): Promise<Vehicle[]> {
        return this.vehicleRepository.find({
            relations: {
                films: true,
                pilots: true
            },
            skip: paginationQuery.offset,
            take: paginationQuery.limit
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

    async addImage(id: number, imageFile: Express.Multer.File): Promise<Vehicle> {
        const vehicle = await this.findOne(id);
        const key = `${imageFile.fieldname}${Date.now()}`;
        const image = await this.imagesService.create(imageFile, key);
        vehicle.images.push(image);

        return this.vehicleRepository.save(vehicle);
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
