import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SubscriptionStatus } from 'generated/prisma/client';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  offerId: string;

  @IsEnum(SubscriptionStatus)
  status: SubscriptionStatus;
}
