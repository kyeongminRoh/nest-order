import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dto/login.responseDto';
import { UserEntity } from '../entity';
import { v4 as uuidv4 } from 'uuid';
import { AuthRepository } from '../repository/auth.repository';
import { AccessLoginRepository } from '../repository/login.repository';
import { TokenPayload } from '../types';
import { AccessTokenRepository, RefreshTokenRepository } from '../repository';

@Injectable()
export class LoginService {
  validateLogin(sub: string, jti: string): UserEntity | PromiseLike<UserEntity> {
    throw new Error("Method not implemented.");
  }
  
  constructor(
    private readonly accessLoginRepository: AccessLoginRepository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async login(email: string, plainPassword: string): Promise<LoginResponseDto> {
    const loginUser = await this.authRepository.findOneByEmail(email);
    const payload: TokenPayload = this.createToken(loginUser, loginUser.id);

    const [accessToken, refreshToken] = await Promise.all([this.createAccessToken(loginUser, payload), this.createRefreshToken(loginUser, payload)])
    
    if (loginUser && loginUser.password === plainPassword) {
      await this.accessLoginRepository.createAccessLog(loginUser);
      return {
        accessToken,
        refreshToken,
        loginUser: {
          id: loginUser.id,
          name: loginUser.name,
          email: loginUser.email,
        },
      };
    }

    throw new Error('Invalid email or password');
  }
  createToken(loginUser: UserEntity, id: any): TokenPayload {
    throw new Error('Method not implemented.');
  }

  createTokenPayload(userId: string): TokenPayload {
    return {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      jti: uuidv4(),
    };
  }

  async createAccessToken(user: UserEntity, payload: TokenPayload): Promise<string> {
    const expiresIn = this.configService.get<string>('ACCESS_TOKEN_EXPIRY');
    const token = this.jwtService.sign(payload, { expiresIn });
    const expiresAt = this.calculateExpiry(expiresIn);

    await this.accessTokenRepository.saveAccessToken(
      payload.jti,
      user,
      token,
      expiresAt,
    );

    return token;
  }

  async createRefreshToken(user: UserEntity, payload: TokenPayload): Promise<string> {
    const expiresIn = this.configService.get<string>('REFRESH_TOKEN_EXPIRY');
    const token = this.jwtService.sign(payload, { expiresIn });
    const expiresAt = this.calculateExpiry(expiresIn);

    await this.refreshTokenRepository.saveRefreshToken(
      payload.jti,
      user,
      token,
      expiresAt,
    );

    return token;
  }


  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const { exp, email, ...payload } = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );
  
      const user = await this.accessLoginRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
  
      return this.createAccessToken(user, payload as TokenPayload);
    } catch (error) {
      throw new Error('Failed to refresh access token');
    }
  }


  private calculateExpiry(expiry: string): Date {
    let expiresInMilliseconds = 0;

    if (expiry.endsWith('d')) {
      const days = parseInt(expiry.slice(0, -1), 10);
      expiresInMilliseconds = days * 24 * 60 * 60 * 1000;
    } else if (expiry.endsWith('h')) {
      const hours = parseInt(expiry.slice(0, -1), 10);
      expiresInMilliseconds = hours * 60 * 60 * 1000;
    } else if (expiry.endsWith('m')) {
      const minutes = parseInt(expiry.slice(0, -1), 10);
      expiresInMilliseconds = minutes * 60 * 1000;
    } else if (expiry.endsWith('s')) {
      const seconds = parseInt(expiry.slice(0, -1), 10);
      expiresInMilliseconds = seconds * 1000;
    } else {
      throw new Error('Invalid expiry format. Please provide expiry in "d", "h", "m", or "s".');
    }

    return new Date(Date.now() + expiresInMilliseconds);
  }
}
