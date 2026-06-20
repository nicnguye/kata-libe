import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiProperty({ example: 'Jean' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiProperty({ example: 'Reno' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Male' })
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 20 })
  age: number;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiProperty({ example: 'password' })
  password: string;
}
