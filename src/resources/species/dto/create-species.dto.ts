import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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

    @ApiProperty()
    @IsString({ each: true })
    readonly homeworld: string;

    @ApiProperty()
    @IsString({ each: true })
    readonly people: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly films: string[];
}

