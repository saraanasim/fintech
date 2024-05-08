import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Booking } from '../bookings/booking.model';
import { User } from '../users/user.model';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true, type: Number })
  amount: number;

  //From stripe maybe
  @Prop({ required: true, type: String })
  paymentMethodId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Booking.name })
  booking: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;
}

export const PaymentModel = SchemaFactory.createForClass(Payment);
