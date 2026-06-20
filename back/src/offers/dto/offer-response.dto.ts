import { IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OfferResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string | null;

  @ApiProperty({ type: 'number', format: 'double' })
  price: number;

  @ApiProperty()
  advantage: string;

  @ApiProperty()
  allowFirstSubscription: boolean;

  @ApiProperty()
  allowResubscription: boolean;

  @ApiProperty()
  allowUpgrade: boolean;
}
