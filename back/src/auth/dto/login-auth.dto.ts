import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
