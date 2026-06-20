import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { SubscriptionResponseDto } from 'src/subscriptions/dto/subscription-response.dto';
import { OfferResponseDto } from 'src/offers/dto/offer-response.dto';

export class SubscriptionAuthResponseDto extends SubscriptionResponseDto {
  @ApiProperty()
  offer: OfferResponseDto;
}

export class ProfileAuthResponseDto {
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

  @ApiProperty({
    type: [SubscriptionAuthResponseDto],
  })
  subscription: SubscriptionAuthResponseDto[];
}
