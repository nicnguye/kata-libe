import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  password: string;
}
