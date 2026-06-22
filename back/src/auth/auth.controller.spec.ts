import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const authServiceMock = {
    login: jest.fn(),
    getProfile: jest.fn(),
  };

  let authController: AuthController;
  let authService: typeof authServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: JwtService,
          useValue: {
            verifySync: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  describe('login', () => {
    it('should call authService.login with email and password', async () => {
      authService.login.mockResolvedValue({ accessToken: 'token' });
      const authFixture = { email: 'email@test.com', password: 'password' };

      await authController.login({
        email: authFixture.email,
        password: authFixture.password,
      });

      expect(authService.login).toHaveBeenCalledWith(
        authFixture.email,
        authFixture.password,
      );
    });
  });

  describe('getProfile', () => {
    it('should throw UnauthorizedException if no user in request', async () => {
      await expect(authController.getProfile({})).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  it('should throw UnauthorizedException if user has no id', async () => {
    const reqFixture = {
      user: {},
    };

    await expect(authController.getProfile(reqFixture)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should call authService.getProfile with userId', async () => {
    const reqFixture = {
      user: { id: 'user1' },
    };

    authService.getProfile.mockResolvedValue({});

    await authController.getProfile(reqFixture);

    expect(authService.getProfile).toHaveBeenCalledWith('user1');
  });
});
