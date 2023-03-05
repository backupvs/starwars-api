import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStarshipDto {
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    readonly model: string;

    @ApiProperty()
    @IsString()
    readonly starshipClass: string;

    @ApiProperty()
    @IsString()
    readonly manufacturer: string;

    @ApiProperty()
    @IsString()
    readonly costInCredits: string;

    @ApiProperty()
    @IsString()
    readonly length: string;

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
    readonly hyperdriveRating: string;

    @ApiProperty()
    @IsString()
    readonly mglt: string;

    @ApiProperty()
    @IsString()
    readonly cargoCapacity: string;

    @ApiProperty()
    @IsString()
    readonly consumables: string;

    @ApiProperty()
    @IsString({ each: true })
    readonly films: string[];

    @ApiProperty()
    @IsString({ each: true })
    readonly pilots: string[];
}
