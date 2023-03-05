import { Type } from "class-transformer";
import { IsString, IsArray, ValidateNested } from "class-validator";
import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";
import { CreateFilmDto } from "../../films/dto/create-film.dto";
import { CreateSpeciesDto } from "../../species/dto/create-species.dto";
import { CreateVehicleDto } from "../../vehicles/dto/create-vehicle.dto";
import { CreateStarshipDto } from "../../starships/dto/create-starship.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonDto {
    @ApiProperty()
    @IsString()
    readonly name: string;
    
    @ApiProperty()
    @IsString()
    readonly height: string;

    @ApiProperty()
    @IsString()
    readonly mass: string;

    @ApiProperty()
    @IsString()
    readonly hairColor: string;

    @ApiProperty()
    @IsString()
    readonly skinColor: string;

    @ApiProperty()
    @IsString()
    readonly eyeColor: string;

    @ApiProperty()
    @IsString()
    readonly birthYear: string;

    @ApiProperty()
    @IsString()
    readonly gender: string;

    // @ApiProperty()
    // @ValidateNested()
    // @Type(() => CreatePlanetDto)
    // readonly homeworld: CreatePlanetDto;
    @ApiProperty()
    @IsString()
    readonly homeworld: string;

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreateFilmDto)
    // readonly films: CreateFilmDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly films: string[];

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreateSpeciesDto)
    // readonly species: CreateSpeciesDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly species: string[];

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
}