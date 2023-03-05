import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { CreateFilmDto } from "../../films/dto/create-film.dto";
import { CreatePersonDto } from "../../people/dto/create-person.dto";

export class CreateVehicleDto {
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    readonly model: string;

    @ApiProperty()
    @IsString()
    readonly vehicleClass: string;

    @ApiProperty()
    @IsString()
    readonly manufacturer: string;

    @ApiProperty()
    @IsString()
    readonly length: string;

    @ApiProperty()
    @IsString()
    readonly costInCredits: string;

    @ApiProperty()
    @IsString()
    readonly crew: string;

    @ApiProperty()
    @IsString()
    readonly passengers: string;

    @ApiProperty()
    @IsString()
    readonly maxAtmospheringSpeed: string;

    @ApiProperty()
    @IsString()
    readonly cargoCapacity: string;

    @ApiProperty()
    @IsString()
    readonly consumables: string;

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
    // @Type(() => CreatePersonDto)
    // readonly pilots: CreatePersonDto[];
    @ApiProperty()
    @IsString({ each: true })
    readonly pilots: string[];
}
