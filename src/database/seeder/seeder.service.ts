import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateDtos, CreateDtosWithIds, SwapiResponseData } from './types';
import { CreateFilmDto } from "../../resources/films/dto/create-film.dto";
import { CreatePersonDto } from "../../resources/people/dto/create-person.dto";
import { CreatePlanetDto } from "../../resources/planets/dto/create-planet.dto";
import { CreateSpeciesDto } from "../../resources/species/dto/create-species.dto";
import { CreateStarshipDto } from "../../resources/starships/dto/create-starship.dto";
import { CreateVehicleDto } from "../../resources/vehicles/dto/create-vehicle.dto";
import { FilmsService } from '../../resources/films/films.service';
import { PeopleService } from '../../resources/people/people.service';
import { PlanetsService } from '../../resources/planets/planets.service';
import { SpeciesService } from '../../resources/species/species.service';
import { VehiclesService } from '../../resources/vehicles/vehicles.service';
import { StarshipsService } from '../../resources/starships/starships.service';

@Injectable()
export class SeederService {
    SWAPI_URL = 'https://swapi.dev/api/';

    constructor(
        private readonly httpService: HttpService,
        private readonly filmsService: FilmsService,
        private readonly peopleService: PeopleService,
        private readonly planetsService: PlanetsService,
        private readonly vehiclesService: VehiclesService,
        private readonly starshipsService: StarshipsService,
        private readonly speciesService: SpeciesService,
    ) {}

    async seed(): Promise<void> {
        try {
            const dtos = await this.collectSwapiData();
            const dtosWithIds = await this.saveMockData(dtos);
            await this.updateWithRelations(dtosWithIds);
        } catch (err) {
            this.logError();
        }
    }

    // Updates entities with names instead of urls
    async updateWithRelations(dtosWithIds: CreateDtosWithIds) {
        let start = Date.now();
        process.stdout.write('Updating mocks with relations (it may take a few minutes)...');
        await this.updateMocks(dtosWithIds.peopleWithIds, this.peopleService);
        await this.updateMocks(dtosWithIds.planetsWithIds, this.planetsService);
        await this.updateMocks(dtosWithIds.filmsWithIds, this.filmsService);
        await this.updateMocks(dtosWithIds.vehiclesWithIds, this.vehiclesService);
        await this.updateMocks(dtosWithIds.starshipsWithIds, this.starshipsService);
        await this.updateMocks(dtosWithIds.speciesWithIds, this.speciesService);
        console.log(`OK in ${(Date.now() - start) / 1000}s`);
    }

    // Saves mock data and returns create dtos with inserted id
    async saveMockData(dtos: CreateDtos) {
        const { people, planets, films, vehicles, starships, species } = dtos;

        let start = Date.now();
        process.stdout.write('Saving mock entities...');
        const peopleWithIds = await this.saveAsMocks(people, this.peopleService);
        const planetsWithIds = await this.saveAsMocks(planets, this.planetsService);
        const filmsWithIds = await this.saveAsMocks(films, this.filmsService);
        const vehiclesWithIds = await this.saveAsMocks(vehicles, this.vehiclesService);
        const starshipsWithIds = await this.saveAsMocks(starships, this.starshipsService);
        const speciesWithIds = await this.saveAsMocks(species, this.speciesService);
        console.log(`OK in ${(Date.now() - start) / 1000}s`);

        return { peopleWithIds, planetsWithIds, filmsWithIds, vehiclesWithIds, starshipsWithIds, speciesWithIds };
    }

    // Fetches swapi.dev and returns all resources.
    async collectSwapiData() {
        let start = Date.now();
        process.stdout.write('Collecting data from Swapi...');
        const people = await this.getResourceEntities<CreatePersonDto>('people');
        const planets = await this.getResourceEntities<CreatePlanetDto>('planets');
        const films = await this.getResourceEntities<CreateFilmDto>('films');
        const vehicles = await this.getResourceEntities<CreateVehicleDto>('vehicles');
        const starships = await this.getResourceEntities<CreateStarshipDto>('starships');
        const species = await this.getResourceEntities<CreateSpeciesDto>('species');
        console.log(`OK in ${(Date.now() - start) / 1000}s`);

        return { people, planets, films, vehicles, starships, species };
    }

    // Change url to names and updates entity
    async updateMocks<T extends { id: number }>(
        entityDtosWithIds: T[],
        service: { update: (id: number, dto: Partial<T>) => Promise<{ id: number }> }
    ) {
        const promises: Promise<{ id: number }>[] = [];

        for (let i = 0; i < entityDtosWithIds.length; i++) {
            const dto = entityDtosWithIds[i];
            const { id } = dto;
            const updateDto = await this.urlToNames(dto);
            promises.push(service.update(id, updateDto));
        }

        return Promise.all(promises);
    }

    // Save mocks and returns array of dtos with inserted ids
    async saveAsMocks<T>(
        dtos: T[],
        service: { create: (dto: T) => Promise<{ id: number }> }
    ): Promise<(T & { id: number })[]> {

        const dtosWithIds: (T & { id: number })[] = [];

        for (let i = 0; i < dtos.length; i++) {
            const mock = this.removeUrls(dtos[i]);
            const { id } = await service.create(mock);
            dtosWithIds[i] = { ...dtos[i], id };
        }

        return dtosWithIds;
    }

    // Gets all people and camelizes their properites
    async getResourceEntities<T>(resourseName: string): Promise<T[]> {
        const entities: T[] = [];
        let next = `${this.SWAPI_URL}/${resourseName}`;

        while (next) {
            const { data } = await this.httpService.axiosRef.get<SwapiResponseData>(next);
            const { results, next: newNext } = data;
            entities.push(...results.map(person => this.camelizeObjectProperties(person)));
            next = newNext;
        }

        return entities;
    }

    // Get single entity by url
    async getEntityName<T>(url: string): Promise<T> {
        const { name, title } = (await this.httpService.axiosRef.get(url)).data;
        return name || title;
    }

    // Takes an object and returns the same object but with camelized properties
    // except meta information.
    camelizeObjectProperties(obj: Record<string, any>): Record<PropertyKey, any> {
        return Object.keys(obj).reduce((acc, key) => {
            if (!['created', 'edited', 'url'].includes(key)) {
                acc[this.camelize(key)] = obj[key];
            }

            return acc;
        }, {});
    }

    // Removes urls from entity to insert it like mock
    removeUrls<T>(obj: T): T {
        return Object.keys(obj).reduce((acc, key) => {
            let value = obj[key];

            if (Array.isArray(value)) {
                value = [];
            }

            if (typeof value === 'string' && this.isSwapiUrl(value)) {
                value = null;
            }
            acc[key] = value

            return acc;
        }, {} as T);
    }

    // Replace url to names and returns valid update dto.
    async urlToNames<T>(dto: T) {
        const updatedDto: Partial<T> = {};
        const keys = Object.keys(dto);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (key === 'url') continue;
            const value = dto[key];

            if (Array.isArray(value) && value.length > 0) {
                const names = await Promise.all(
                    value.map(url => this.getEntityName(url))
                )
                updatedDto[key] = names;
            }
            if (typeof value === 'string' && this.isSwapiUrl(value)) {
                updatedDto[key] = await this.getEntityName(value);
            }
        }

        return updatedDto;
    }

    // Camelizes string (e. g. my_simple_STRING => mySimpleString)
    camelize(str: string) {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    isSwapiUrl(url: string) {
        return url.startsWith(this.SWAPI_URL);
    }

    logError() {
        console.error(
            `\nError.` +
            `\nTry run "npm run typeorm:truncate-tables" to remove all rows from tables.` +
            `\nAttention: this operation will delete all data from current tables:` +
            `\npeople, planets, films, vehicles, starships, species`
        );
    }
}
