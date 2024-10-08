import { LoginDto } from './../dto/login.dto';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { instanceToPlain } from 'class-transformer';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { TokenService } from './token.service';
import { TokensDto } from '../dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async login({ email, password }: LoginDto): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email } });
    } catch (error) {
      throw new UnauthorizedException(`There is no user with email ${email}`);
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    const plainUser = instanceToPlain(user) as User;

    return plainUser;
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    try {
      const user = await this.userService.findOne({
        where: { email: signUpDto.email },
      });
      if (user) {
        throw new ConflictException(
          `The email «${signUpDto.email}» is already registered.`,
        );
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
      // If the user is not found, it is normal for registration
    }

    const user = await this.userService.create(signUpDto);
    const plainUser = instanceToPlain(user) as User;

    return plainUser;
  }

  async logout(refreshToken: string): Promise<object> {
    console.log('Refresh Token from logout service', refreshToken);
    try {
      await this.tokenService.revokeToken(refreshToken);
      return { statusCode: HttpStatus.OK, message: 'Logout successful' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid refresh token');
      } else if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(
          'An unexpected error occurred during logout',
        );
      }
    }
  }

  async refreshTokens(
    accessToken: string,
    refreshToken: string,
  ): Promise<object> {
    try {
      const accessPayload = this.jwtService.decode(accessToken);
      const refreshPayload = this.jwtService.verify(refreshToken);

      if (accessPayload.sub !== refreshPayload.sub) {
        throw new UnauthorizedException('Tokens do not match');
      }

      const user = await this.userService.findOne({
        where: { email: refreshPayload.sub },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokenEntity = await this.tokenService.validateToken(refreshToken);
      if (!tokenEntity) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      accessToken = this.signToken(user);

      return { accessToken };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email: payload.sub } });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  signRefreshToken(user: User): string {
    const payload = {
      sub: user.email,
    };
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
  }

  async createTokens(user: User): Promise<TokensDto> {
    const accessToken = this.signToken(user);
    const refreshToken = this.signRefreshToken(user);

    await this.tokenService.saveToken(
      user.user_id,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return { accessToken, refreshToken };
  }
}
