import { OmitType } from "@nestjs/swagger";
import { User } from "../../users/entities/User.entity";

export class UserWithoutPasswordDto extends OmitType(User, ['password']) {}