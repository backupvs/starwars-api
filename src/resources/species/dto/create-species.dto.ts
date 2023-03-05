import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

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
    @IsNotEmpty()
    @IsString()
    @ValidateIf((_, value) => value !== null)
    readonly homeworld: string | null;

    @ApiProperty()
    @IsString({ each: true })
    readonly people: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly films: string[];
}

