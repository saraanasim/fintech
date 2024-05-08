import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Booking } from '../bookings/booking.model';
import { Merchant } from '../merchants/merchant.model';
import { User } from '../users/user.model';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
    @Prop({ required: true, type: String })
    content: string;

    @Prop({ required: true, type: Number, min: 0, max: 5 })
    rating: number;

    @Prop({ required: true, type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: null })
    updatedAt: Date;

    @Prop({
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: Merchant.name,
        default: null,
    })
    merchant: string;

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
        ref: Booking.name,
        default: null,
    })
    booking: string;

}

export const ReviewModel = SchemaFactory.createForClass(Review);
