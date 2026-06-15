import { IsString, IsNotEmpty, IsDecimal, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  title: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  advantage: string;

  @IsBoolean()
  @IsNotEmpty()
  allowFirstSubscription: boolean;

  @IsBoolean()
  @IsNotEmpty()
  allowResubscription: boolean;

  @IsBoolean()
  @IsNotEmpty()
  allowUpgrade: boolean;
}
