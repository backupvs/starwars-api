import { PartialType } from "@nestjs/swagger";
import { CreateFilmDto } from "./create-film.dto";

export default class UpdateFilmDto extends PartialType(CreateFilmDto) {}