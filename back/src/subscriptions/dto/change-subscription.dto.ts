import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a9a6e149-5eb3-44a7-a667-1a896aeff897' })
  offerId: string;
}
