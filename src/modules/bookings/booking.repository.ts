import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { Booking, BookingDocument } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  get(id: string): Promise<BookingDocument> {
    return this.bookingModel.findById(id).exec();
  }

  async create(payload: CreateBookingDto): Promise<BookingDocument> {
    try {
      const createdBooking = new this.bookingModel(payload);
      return createdBooking.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

 
  async update(
    bookingId:string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<BookingDocument> {
    try {
      return await this.bookingModel
        .findOneAndUpdate({ _id: bookingId }, updateBookingDto, { new: true })
        .exec();
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }
}
