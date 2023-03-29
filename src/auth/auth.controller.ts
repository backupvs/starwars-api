import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { UserWithoutPasswordDto } from './dto/user-without-password.dto';
import { ResponseWithAccessToken } from './interfaces/responseWithAccessToken.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({ type: ResponseWithAccessToken })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: RequestWithUser) {
        return this.authService.login(req.user);
    }

    @ApiCreatedResponse({ type: UserWithoutPasswordDto })
    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
}
