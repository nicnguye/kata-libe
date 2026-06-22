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
      const testData = { email: 'email@test.com', password: 'password' };

      await authController.login({
        email: testData.email,
        password: testData.password,
      });

      expect(authService.login).toHaveBeenCalledWith(
        testData.email,
        testData.password,
      );
    });
  });

  describe('getProfile', () => {
    it('should throw UnauthorizedException if no user in request', async () => {
      await expect(authController.getProfile({} as any)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  it('should throw UnauthorizedException if user has no id', async () => {
    const req = {
      user: {},
    };

    await expect(authController.getProfile(req as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should call authService.getProfile with userId', async () => {
    const req = {
      user: { id: 'user1' },
    };

    authService.getProfile.mockResolvedValue({} as any);

    await authController.getProfile(req as any);

    expect(authService.getProfile).toHaveBeenCalledWith('user1');
  });
});
