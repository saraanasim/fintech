import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { HydratedDocument } from 'mongoose';
import { BookingStatuses } from '../../utils/constants';
import { Merchant } from '../merchants/merchant.model';
import { User } from '../users/user.model';


export type BookingDocument = HydratedDocument<Booking>;
@Schema({ timestamps: true })
export class Booking extends Document {
    @Prop({
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        default: null,
    })
    user: string;

    @Prop({
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: Merchant.name,
        default: null,
    })
    merchant: string;

    @Prop({
        required: true,
        enum: BookingStatuses,
        default: BookingStatuses.PENDING,
    })
    status?: string;
}

export const BookingModel = SchemaFactory.createForClass(Booking);