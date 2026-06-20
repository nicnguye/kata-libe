import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OfferResponseDto {
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
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
