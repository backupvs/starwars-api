import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
import { ImagesService } from '../../images/images.service';

@Injectable()
export class StarshipsService {
    constructor(
        @InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
        private readonly imagesService: ImagesService
    ) {}

    findAll(paginationQuery: PaginationQueryDto): Promise<Starship[]> {
        return this.starshipRepository.find({
            relations: {
                films: true,
                pilots: true
            },
            skip: paginationQuery.offset,
            take: paginationQuery.limit
        });
    }

    async findOne(id: number): Promise<Starship> {
        const starship = await this.starshipRepository.findOne({
            where: { id },
            relations: {
                films: true,
                pilots: true
            }
        })

        if (!starship) {
            throw new NotFoundException(`Starship #${id} not found`);
        }

        return starship;
    }

    async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
        const relations = await this.preloadRelations(createStarshipDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const newStarship = this.starshipRepository.create({
            ...createStarshipDto,
            ...relations
        });

        return this.starshipRepository.save(newStarship);
    }

    async update(id: number, updateStarshipDto: UpdateStarshipDto): Promise<Starship> {
        const relations = await this.preloadRelations(updateStarshipDto);

        if (relations === null) {
            throw new BadRequestException(`Some entities does not exist`);
        }

        const starship = await this.starshipRepository.preload({
            id,
            ...updateStarshipDto,
            ...relations
        });

        if (!starship) {
            throw new NotFoundException(`Starship #${id} not found`);
        }

        return this.starshipRepository.save(starship);
    }

    async remove(id: number): Promise<Starship> {
        const starship = await this.findOne(id);

        return this.starshipRepository.remove(starship);
    }

    async addImage(id: number, imageFile: Express.Multer.File): Promise<Starship> {
        const starship = await this.findOne(id);
        const key = `${imageFile.fieldname}${Date.now()}`;
        const image = await this.imagesService.create(imageFile, key);
        starship.images.push(image);

        return this.starshipRepository.save(starship);
    }

    // Preload relations for starships
    async preloadRelations(starshipDto: UpdateStarshipDto | CreateStarshipDto) {
        const pilots =
            starshipDto.pilots &&
            (await Promise.all(
                starshipDto.pilots.map(person => this.preloadPerson(person))
            ));

        const films =
            starshipDto.films &&
            (await Promise.all(
                starshipDto.films.map(film => this.preloadFilm(film))
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
