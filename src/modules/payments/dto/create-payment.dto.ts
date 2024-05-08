import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly paymentMethodId: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly booking: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly user: string;
}
