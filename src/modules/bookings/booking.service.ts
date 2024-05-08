import {
  BadRequestException,
  Injectable,
  Logger
} from '@nestjs/common';


import { BookingDocument } from './booking.model';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking';

@Injectable()
export class BookingService {

  constructor(
    private bookingRepository: BookingRepository,
  ) { }
  private readonly logger = new Logger(BookingService.name);

   // Creates booking with pending status
   async create(
    createBookingDto:CreateBookingDto
  ): Promise<BookingDocument> {
    try {
      return this.bookingRepository.create(createBookingDto);
    } catch (err) {
      this.logger.log('Error finding booking', err);
      throw new BadRequestException(
        'Something went wrong while creating booking',
      );
    }
  }

   // For updating booking status
   async update(
    bookingId:string,
    updateBookingDto:UpdateBookingDto
  ): Promise<BookingDocument> {
    try {
      return this.bookingRepository.update(bookingId,updateBookingDto);
    } catch (err) {
      this.logger.log('Error finding booking', err);
      throw new BadRequestException(
        'Something went wrong while creating booking',
      );
    }
  }

}
