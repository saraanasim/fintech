import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookingController } from './booking.controller';
import { Booking, BookingModel } from './booking.model';
import { BookingRepository } from './booking.repository';
import { BookingService } from './booking.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingModel, collection: 'bookings' },
    ]),
  ],
  providers: [BookingService, BookingRepository],
  exports: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
