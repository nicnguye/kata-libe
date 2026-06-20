import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  offerId: string;
}
