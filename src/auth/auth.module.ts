import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repository/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/auth.entity';
import { AccessLoginRepository, AccessTokenRepository, RefreshTokenRepository } from './repository';
import { LoginService } from './services';
import { PassportModule } from '@nestjs/passport';
import { AccessToken, RefreshToken } from './entity';
import { JwtStrategy } from './stategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT-SECRET'),
        signOtions: {
          expiresIn: configService.get<string>('ACCESS-TOKEN-EXPIRY'),
        },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  TypeOrmModule.forFeature([UserEntity, AccessToken, RefreshToken])
],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    LoginService,
    AccessLoginRepository,
    AccessTokenRepository,
    RefreshTokenRepository,

    JwtStrategy,
  ],
  exports: [
    AuthService,
    AuthRepository,
    LoginService,
    AccessLoginRepository,
    AccessTokenRepository,
    RefreshTokenRepository,
    
    JwtStrategy,
  ],
})
export class AuthModule {}
