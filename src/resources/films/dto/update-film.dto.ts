import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateFilmDto } from "./create-film.dto";
// import { PartialType } from "@nestjs/mapped-types"

export class UpdateFilmDto extends PartialType(CreateFilmDto) {}