import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../entity/auth.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateSignupDto } from '../dto/signup.requestDto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.authRepository.findOne({ where: { email } });
  }
  

  async createSignup(createSignupDto: CreateSignupDto): Promise<UserEntity> {
    const authSignup = new UserEntity();
    authSignup.name = createSignupDto.name;
    authSignup.email = createSignupDto.email;
    authSignup.password = createSignupDto.password;
    return this.authRepository.save(authSignup);
  }
}
