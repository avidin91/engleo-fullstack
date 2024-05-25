import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { matchingPassword } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TUser } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Неверные email или пароль!');
    }

    const isPasswordMatch = await matchingPassword(password, user.passwordHash);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Неверные email или пароль!');
    }

    return user;
  }

  async login(user: TUser) {
    const { id, email } = user;

    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
