import { ApiProperty } from '@nestjs/swagger';

export class AppResponseDto {
  @ApiProperty({ example: 'API' })
  name: string;

  @ApiProperty({ example: '1.0' })
  version: string;

  @ApiProperty({ example: '/api' })
  docs: string;

  @ApiProperty({ example: '/health' })
  health: string;
}
