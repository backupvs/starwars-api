import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { UserWithoutPasswordDto } from "../dto/user-without-password.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<UserWithoutPasswordDto> {
        const user = await this.authService.validateUser({ username, password });
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}