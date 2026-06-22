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
      const createUserDto = {
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
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        gender: createUserDto.gender,
        age: createUserDto.age,
        email: createUserDto.email,
        password: 'hashedPassword',
      };

      const expectedUser = {
        id: 'userId',
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        gender: createUserDto.gender,
        age: createUserDto.age,
        email: createUserDto.email,
      };
      usersService.create.mockResolvedValue(expectedUser);

      const result = await usersController.create(createUserDto);

      expect(usersService.findOneBy).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(usersService.create).toHaveBeenCalledWith(expectedHydratedData);
      expect(result).toEqual(expectedUser);
    });

    it('should throw ConflictException if user already exists', async () => {
      const createUserDto = {
        firstName: 'Jean',
        lastName: 'Reno',
        gender: 'Male',
        age: 30,
        email: 'user@email.com',
        password: '123456',
      };
      usersService.findOneBy.mockResolvedValue({ id: 'userId' });

      await expect(usersController.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
