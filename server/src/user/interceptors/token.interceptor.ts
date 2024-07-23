import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import type { Response } from 'express';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  import type { User } from '../../user/entities/user.entity';
  import { AuthService } from '../services/auth.service';
  
  @Injectable()
  export class TokenInterceptor implements NestInterceptor {
    constructor(private readonly authService: AuthService) {}
  
    intercept(
      context: ExecutionContext,
      next: CallHandler<User>,
    ): Observable<any> {
      return next.handle().pipe(
        map(async (user) => {
          const response = context.switchToHttp().getResponse<Response>();
          const { accessToken, refreshToken } = await this.authService.createTokens(user);
  
          response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            signed: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
  
          return {user, accessToken};
        }),
      );
    }
  }
  