import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionStatus } from 'generated/prisma/client';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  offerId: string;

  @IsEnum(SubscriptionStatus)
  @ApiProperty({ example: 'ACTIVE' })
  status: SubscriptionStatus;
}
