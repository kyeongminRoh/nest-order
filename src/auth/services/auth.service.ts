import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { CreateSignupDto } from '../dto/signup.requestDto';
import { UserEntity } from '../entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(readonly authRepository: AuthRepository) {}

  async createSignup(createSignupDto: CreateSignupDto): Promise<UserEntity> {
    await this.authRepository.findOneByEmail(createSignupDto.email);
    const authSignup = new UserEntity();
    authSignup.id = createSignupDto.id;
    authSignup.name = createSignupDto.name;
    authSignup.email = createSignupDto.email;
    authSignup.password = createSignupDto.password;
    return this.authRepository.createSignup(createSignupDto);
  }
}
