import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'Returns user created',
  })
  @ApiConflictResponse({
    description: 'User email already exists',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException('User email already exists');
    }

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const createUserData = { ...createUserDto, password: hashPassword };
    const userCreated = await this.usersService.create(createUserData);
    return {
      id: userCreated.id,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      gender: userCreated.gender,
      age: userCreated.age,
      email: userCreated.email,
    };
  }
}
