import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentController } from './payment.controller';
import { Payment, PaymentModel } from './payment.model';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';
import { BookingModule } from '../bookings/booking.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentModel, collection: 'payments' },
    ]),
    BookingModule
  ],
  providers: [PaymentService, PaymentRepository],
  exports: [],
  controllers: [PaymentController],
})
export class PaymentModule {}
