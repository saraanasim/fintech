import { IsMongoId, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsMongoId()
  booking?: string;
}
