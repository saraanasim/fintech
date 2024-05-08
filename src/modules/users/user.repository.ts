import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.model';
import { FindPayloadType } from '../../utils/types';
import { getFindQueryProps } from '../../utils/helpers';

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
