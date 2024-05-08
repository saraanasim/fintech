import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getFindQueryProps } from '../../utils/helpers';
import { FindPayloadType } from '../../utils/types';
import { Merchant, MerchantDocument } from './merchant.model';

@Injectable()
export class MerchantRepository {
  constructor(
    @InjectModel(Merchant.name) private readonly merchantModel: Model<Merchant>,
  ) {}

  get(id: string): Promise<MerchantDocument> {
    return this.merchantModel.findById(id).exec();
  }

  async findOne(payload: FindPayloadType<Merchant>): Promise<MerchantDocument> {
    try {
      const { filter, ref } = getFindQueryProps(payload);
      return await this.merchantModel.findOne(filter).populate(ref).exec();
    } catch (err) {
      throw new BadRequestException(
        'Something went wrong while finding merchant',
      );
    }
  }
  async findAll(payload: FindPayloadType<Merchant>): Promise<MerchantDocument[]> {
    try {
      const { filter, ref } = getFindQueryProps(payload);
      return await this.merchantModel.find(filter).populate(ref).exec();
    } catch (err) {
      throw new BadRequestException(
        'Something went wrong while finding merchant',
      );
    }
  }
}
