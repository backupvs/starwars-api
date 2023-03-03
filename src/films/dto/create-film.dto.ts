import { Type } from "class-transformer";
import { IsString, IsDate, IsNumber, IsArray, ValidateNested } from "class-validator";
import { CreatePersonDto } from "../../people/dto/create-person.dto";
import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";

export class CreateFilmDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly episodeId: number;

    @IsString()
    readonly openingCrawl: string;

    @IsString()
    readonly director: string;

    @IsString()
    readonly producer: string;

    @IsDate()
    readonly releaseDate: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePersonDto)
    readonly characters: CreatePersonDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePlanetDto)
    readonly planets: CreatePlanetDto[];

    @IsString({ each: true })
    readonly starships: string[]; // Starship[]

    @IsString({ each: true })
    readonly vehicles: string[]; // Vehicle[]

    @IsString({ each: true })
    readonly species: string[]; // Species[]
}