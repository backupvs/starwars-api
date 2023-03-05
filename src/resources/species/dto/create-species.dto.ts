import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { CreateFilmDto } from "../../films/dto/create-film.dto";
import { CreatePersonDto } from "../../people/dto/create-person.dto";
import { CreatePlanetDto } from "../../planets/dto/create-planet.dto";

export class CreateSpeciesDto {
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    readonly classification: string;

    @ApiProperty()
    @IsString()
    readonly designation: string;

    @ApiProperty()
    @IsString()
    readonly averageHeight: string;

    @ApiProperty()
    @IsString()
    readonly averageLifespan: string;

    @ApiProperty()
    @IsString()
    readonly eyeColors: string;

    @ApiProperty()
    @IsString()
    readonly hairColors: string;

    @ApiProperty()
    @IsString()
    readonly skinColors: string;

    @ApiProperty()
    @IsString()
    readonly language: string;

    // @ApiProperty()
    // @ValidateNested()
    // @Type(() => CreatePlanetDto)
    // readonly homeworld: CreatePlanetDto;
    @ApiProperty()
    @IsString({ each: true })
    readonly homeworld: string;

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreatePersonDto)
    // readonly people: CreatePersonDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly people: string[];

    // @ApiProperty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreateFilmDto)
    // readonly films: CreateFilmDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly films: string[];
}

