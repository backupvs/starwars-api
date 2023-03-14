import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
    constructor(
        // private readonly userService: UsersService
    ) {}

    // @UseGuards(AuthGuard('jwt'))
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}
