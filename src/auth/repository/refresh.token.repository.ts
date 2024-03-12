import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { RefreshToken, UserEntity } from '../entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(refreshTokenRepository.target, refreshTokenRepository.manager, refreshTokenRepository.queryRunner);
  }

  async saveRefreshToken(
    jti: string,
    user: UserEntity,
    token: string,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    const refreshToken = new RefreshToken();
    refreshToken.jti = jti;
    refreshToken.user = user;
    refreshToken.token = token;
    refreshToken.expiresAt = expiresAt;
    refreshToken.isRevoked = false;
    return this.save(refreshToken);
  }
}
