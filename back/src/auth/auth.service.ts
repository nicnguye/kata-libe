import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pwd: string) {
    // Find user
    const user = await this.usersService.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare password
    const isMatch = await bcrypt.compare(pwd, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async getProfile(userId: string) {
    // Find userProfile
    const user = await this.usersService.getUserProfile(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
