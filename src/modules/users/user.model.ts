import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String, select: false })
  password: string;

  @Prop({ required: true, type: String })
  name: string;
}

export const UserModel = SchemaFactory.createForClass(User);
