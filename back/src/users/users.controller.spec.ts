jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  const usersServiceMock = {
    findOneBy: jest.fn(),
    create: jest.fn(),
  };

  let usersController: UsersController;
  let usersService: typeof usersServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
  });

  describe('create', () => {
    it('should call usersService.create and return the created user', async () => {
      const createUserFixture = {
        firstName: 'Jean',
        lastName: 'Reno',
        gender: 'Male',
        age: 30,
        email: 'user@email.com',
        password: '123456',
      };
      usersService.findOneBy.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const expectedHydratedData = {
        firstName: createUserFixture.firstName,
        lastName: createUserFixture.lastName,
        gender: createUserFixture.gender,
        age: createUserFixture.age,
        email: createUserFixture.email,
        password: 'hashedPassword',
      };

      const expectedUser = {
        id: 'userId',
        firstName: createUserFixture.firstName,
        lastName: createUserFixture.lastName,
        gender: createUserFixture.gender,
        age: createUserFixture.age,
        email: createUserFixture.email,
      };
      usersService.create.mockResolvedValue(expectedUser);

      const result = await usersController.create(createUserFixture);

      expect(usersService.findOneBy).toHaveBeenCalledWith({
        email: createUserFixture.email,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserFixture.password, 10);
      expect(usersService.create).toHaveBeenCalledWith(expectedHydratedData);
      expect(result).toEqual(expectedUser);
    });

    it('should throw ConflictException if user already exists', async () => {
      const createUserFixture = {
        firstName: 'Jean',
        lastName: 'Reno',
        gender: 'Male',
        age: 30,
        email: 'user@email.com',
        password: '123456',
      };
      usersService.findOneBy.mockResolvedValue({ id: 'userId' });

      await expect(usersController.create(createUserFixture)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
