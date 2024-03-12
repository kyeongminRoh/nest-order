// import { Body, Controller, Post, Req } from '@nestjs/common';
// import { RefreshReqDto } from 'auth/dto';
// import { LoginRequestDto } from 'auth/dto/login.requestDto';
// import { LoginResponseDto } from 'auth/dto/login.responsedto';
// import { LoginService } from 'auth/services/login.service';

// @Controller('api')
// export class LoginController {
//   constructor(private readonly loginService: LoginService) {}

//   @Post('login')
//   async login(
//     @Body() loginRequestDto: LoginRequestDto,
//   ): Promise<LoginResponseDto> {

//     return this.loginService.login(
//       loginRequestDto.email,
//       loginRequestDto.password
//     );
//   }

//   @Post('refresh')
//   async refresh(@Body() dto: RefreshReqDto): Promise<string> {
//     return this.loginService.refreshAccessToken(dto.refreshToken);
//   }
// }
