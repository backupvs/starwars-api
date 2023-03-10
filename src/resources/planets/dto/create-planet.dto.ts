import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePlanetDto {
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    readonly rotationPeriod: string;

    @ApiProperty()
    @IsString()
    readonly orbitalPeriod: string;

    @ApiProperty()
    @IsString()
    readonly diameter: string;

    @ApiProperty()
    @IsString()
    readonly gravity: string;

    @ApiProperty()
    @IsString()
    readonly population: string;

    @ApiProperty()
    @IsString()
    readonly climate: string;

    @ApiProperty()
    @IsString()
    readonly terrain: string;

    @ApiProperty()
    @IsString()
    readonly surfaceWater: string;

    @ApiProperty()
    @IsString({ each: true })
    readonly residents: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly films: string[];
}