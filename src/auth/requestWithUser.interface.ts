import { Request } from "express";
import { UserWithoutPasswordDto } from "./dto/user-without-password.dto";

export interface RequestWithUser extends Request{
    user: UserWithoutPasswordDto
}