import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment, PaymentDocument } from './payment.model';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}

  async create(payload: CreatePaymentDto): Promise<PaymentDocument> {
    try {
      const createdBooking = new this.paymentModel(payload);
      return createdBooking.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
