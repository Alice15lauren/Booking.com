import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    await this.userService.markLoggedIn(user.id);

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);
    return {
      message: 'Login Successful',
      token,
      user: {
        id: user.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    };
  }
}
