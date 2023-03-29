import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserWithoutPasswordDto } from './dto/user-without-password.dto';
import { ResponseWithAccessToken } from './interfaces/responseWithAccessToken.interface';

@Injectable()
export class AuthService {
    saltRounds = 10;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(loginUserDto: LoginUserDto): Promise<UserWithoutPasswordDto | null> {
        const { username, password: passwordInput } = loginUserDto;
        const user = await this.usersService.findOne(username);
        const isValid = await bcrypt.compare(passwordInput, user?.password || '');
        if (!user || !isValid) return null;

        const { password, ...result } = user;
        return result;
    }

    async login(user: UserWithoutPasswordDto): Promise<ResponseWithAccessToken> {
        const payload = { userId: user.id, username: user.username, role: user.role };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(createUserDto: CreateUserDto): Promise<UserWithoutPasswordDto> {
        const hash = await bcrypt.hash(createUserDto.password, this.saltRounds);
        const { password, ...newUser } = await this.usersService.create({
            ...createUserDto,
            password: hash
        });

        return newUser;
    }
}
