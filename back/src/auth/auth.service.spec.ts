jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  const jwtServiceMock = {
    signAsync: jest.fn(),
  };

  const usersServiceMock = {
    getUserProfile: jest.fn(),
    findOneBy: jest.fn(),
  };

  let authService: AuthService;
  let usersService: typeof usersServiceMock;
  let jwtService: typeof jwtServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('login', () => {
    it('should return accessToken', async () => {
      usersService.findOneBy.mockResolvedValue({
        id: 'userId',
        email: 'email',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const expectedPayload = { sub: 'userId', email: 'email' };
      const token = 'accessToken';
      jwtService.signAsync.mockResolvedValue(token);

      const result = await authService.login('email', 'password');

      expect(result).toEqual({ accessToken: token });
      expect(jwtService.signAsync).toHaveBeenCalledWith(expectedPayload);
    });

    it('should throw NotFoundException if user is not found', async () => {
      usersService.findOneBy.mockResolvedValue(null);

      await expect(authService.login('email', 'password')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      usersService.findOneBy.mockResolvedValue({ id: 'userId' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login('email', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
