import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type MerchantDocument = HydratedDocument<Merchant>;

@Schema({ timestamps: true })
export class Merchant extends Document {

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: true, type: String, select: false })
    password: string;

    @Prop({ required: true, type: String })
    name: string;
}

export const MerchantModel = SchemaFactory.createForClass(Merchant);
