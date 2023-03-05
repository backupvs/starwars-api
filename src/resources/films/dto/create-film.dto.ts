import { Type } from "class-transformer";
import { IsString, IsDate, IsNumber, IsArray, ValidateNested } from "class-validator";
import { CreatePersonDto } from "../../people/dto/create-person.dto";
import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";
import { CreateSpeciesDto } from "../../species/dto/create-species.dto";
import { CreateVehicleDto } from "../../vehicles/dto/create-vehicle.dto";
import { CreateStarshipDto } from "../../starships/dto/create-starship.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFilmDto {
    @ApiProperty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsNumber()
    readonly episodeId: number;

    @ApiProperty()
    @IsString()
    readonly openingCrawl: string;

    @ApiProperty()
    @IsString()
    readonly director: string;

    @ApiProperty()
    @IsString()
    readonly producer: string;

    @ApiProperty()
    @IsDate()
    readonly releaseDate: Date;

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreatePersonDto)
    // readonly characters: CreatePersonDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly characters: string[];

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreatePlanetDto)
    // readonly planets: CreatePlanetDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly planets: string[];

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreateVehicleDto)
    // readonly vehicles: CreateVehicleDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly vehicles: string[];

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreateStarshipDto)
    // readonly starships: CreateStarshipDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly starships: string[];

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreateSpeciesDto)
    // readonly species: CreateSpeciesDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly species: string[];
}