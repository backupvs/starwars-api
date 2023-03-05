import { IsString, IsDate, IsNumber } from "class-validator";
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

    @ApiProperty()
    @IsString({ each: true })
    readonly characters: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly planets: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly vehicles: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly starships: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly species: string[];
}