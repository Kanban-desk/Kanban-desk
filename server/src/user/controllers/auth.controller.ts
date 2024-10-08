import { AuthService } from './../services/auth.service';
import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Body,
  Get,
  Res,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TokenInterceptor } from '../interceptors/token.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.signedCookies;
    res.clearCookie('refreshToken');

    try {
      const result = await this.authService.logout(refreshToken);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: error.message });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @Get('refresh')
  @ApiBearerAuth('jwt')
  refreshTokens(@Req() req: Request) {
    const { refreshToken } = req.signedCookies;
    return this.authService.refreshTokens(req['accessToken'], refreshToken);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async callback(@Req() req: Request, @Res() res: Response) {
    // const jwt = await this.authService.login(req.user);
    // res.set('authorization', jwt.access_token)
    res.json(req.user);
  }

  @Get('test-route')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  async test(@Res() res: Response) {
    console.log('inside a test-route!');
    res.json('success');
  }
}
