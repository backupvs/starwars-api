import { IsString, IsNotEmpty } from "class-validator";
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

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly homeworld: string;

    @ApiProperty()
    @IsString({ each: true })
    readonly films: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly species: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly vehicles: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly starships: string[];
}