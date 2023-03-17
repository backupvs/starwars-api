import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    // @UseGuards(AuthGuard('jwt'))
    // @Get('check')
    // getProfile(@Request() req) {
    //     return req.user;
    // }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req, @Body() loginUserDto: LoginUserDto) {
        return this.authService.login(req.user);
    }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
}
