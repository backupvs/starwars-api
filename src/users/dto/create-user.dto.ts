import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto  {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @MinLength(8)
    readonly password: string;
}