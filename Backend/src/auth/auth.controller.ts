/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    const user = req.user;
    await this.userService.markLoggedOut(user.id);

    return {
      message:
        'Logged out successfully. Please delete the token on client side.',
    };
  }
}
