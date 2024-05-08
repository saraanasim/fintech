import {
    IsEnum,
    IsMongoId,
    IsOptional,
    IsString
} from 'class-validator';
import { BookingStatuses } from '../../../utils/constants';

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

