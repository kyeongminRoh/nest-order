import { Body, Controller, Post } from '@nestjs/common';
import { CreateSignupDto } from '../dto/signup.requestDto';
import { SignupResDto } from '../dto/signup.resposneDto';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto, LoginResponseDto, RefreshReqDto } from '../dto';
import { LoginService } from '../services/login.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
    ) {}

  @Post('signup')
  async signup(
    @Body() createSignupDto: CreateSignupDto,
  ): Promise<SignupResDto> {
    const authSignup = await this.authService.createSignup(createSignupDto);
    return {
      id: authSignup.id,
      name: authSignup.name,
      email: authSignup.email,
    };
  }

  @Post('login')
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {

    return this.loginService.login(
      loginRequestDto.email,
      loginRequestDto.password
    );
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshReqDto): Promise<string> {
    return this.loginService.refreshAccessToken(dto.refreshToken);
  }
}
