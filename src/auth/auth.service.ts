import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/User.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    saltRounds = 10;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(loginUserDto: LoginUserDto): Promise<Omit<User, 'password'> | null> {
        const { username, password: passwordInput } = loginUserDto;
        const user = await this.usersService.findOne(username);
        const isValid = await bcrypt.compare(passwordInput, user?.password || '');
        if (!user || !isValid) return null;

        const { password, ...result } = user;
        return result;
    }

    async login(user: Omit<User, 'password'>) {
        const payload = { userId: user.id, username: user.username, role: user.role };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(createUserDto: CreateUserDto) {
        const password = await bcrypt.hash(createUserDto.password, this.saltRounds);

        return this.usersService.create({
            ...createUserDto,
            password
        })
    }
}
