import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SubscriptionResponseDto {
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  userId: string;

  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  offerId: string;

  @ApiProperty({
    enum: ['ACTIVE', 'CANCELLED'],
  })
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
