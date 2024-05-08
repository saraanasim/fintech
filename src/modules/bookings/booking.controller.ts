import {
  Body,
  Controller,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingDocument } from './booking.model';
import { UpdateBookingDto } from './dto/update-booking';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<BookingDocument> {
    return this.bookingService.create(createBookingDto);
  }

  @Patch(':bookingId')
  markCompleted(
    @Body() updateBookingDto: UpdateBookingDto,
    @Param('bookingId') bookingId: string,
  ): Promise<BookingDocument> {
    return this.bookingService.markCompleted(bookingId,updateBookingDto);
  }
}
