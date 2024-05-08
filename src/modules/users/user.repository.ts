import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { getFindQueryProps } from 'src/utils/helpers';
import { FindPayloadType } from 'src/utils/types';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  get(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }
  
  async findOne(payload: FindPayloadType<User>): Promise<UserDocument> {
    try {
      const { filter, ref } = getFindQueryProps(payload);
      return await this.userModel.findOne(filter).populate(ref).exec();
    } catch (err) {
      throw new BadRequestException(
        'Something went wrong while finding user',
      );
    }
  }
  async findAll(payload: FindPayloadType<User>): Promise<UserDocument[]> {
    try {
      const { filter, ref } = getFindQueryProps(payload);
      return await this.userModel.find(filter).populate(ref).exec();
    } catch (err) {
      throw new BadRequestException(
        'Something went wrong while finding user',
      );
    }
  }
}
