import {
  Controller,
  HttpCode,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ProfileAuthResponseDto } from './dto/profile-auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @ApiOkResponse({ type: ProfileAuthResponseDto })
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // Get jwt payload from request
    if (!req?.user?.id) {
      throw new UnauthorizedException();
    }

    return this.authService.getProfile(req.user.id as string);
  }
}
