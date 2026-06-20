import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  offerId: string;
}
