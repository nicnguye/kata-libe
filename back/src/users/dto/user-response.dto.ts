import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UserResponseDto {
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  email: string;
}
