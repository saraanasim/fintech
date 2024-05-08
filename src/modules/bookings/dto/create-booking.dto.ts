import {
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';
import { BookingStatuses } from 'src/utils/constants';

export class CreateBookingDto {

    @IsEnum(BookingStatuses)
    @IsOptional()
    status?: string;

    @IsString()
    @IsMongoId()
    user: string;

    @IsString()
    @IsMongoId()
    merchant: string;


}

