import {
  BadRequestException,
  Injectable,
  Logger
} from '@nestjs/common';

import { Merchant, MerchantDocument } from './merchant.model';
import { MerchantRepository } from './merchant.repository';

@Injectable()
export class MerchantService {

  constructor(
    private merchantRepository:MerchantRepository,
  ) { }
  private readonly logger = new Logger(MerchantService.name);

  get(id: string): Promise<Merchant> {
    try {
      return this.merchantRepository.get(id);
    } catch (err) {
      this.logger.log('Error finding merchant', err);
      throw new BadRequestException(
        'Something went wrong while finding merchant',
      );
    }
  }

  // Fetches all merchants (For showing in postman)
  getAllMerchants(): Promise<MerchantDocument[]> {
    try {
      return this.merchantRepository.findAll({});
    } catch (err) {
      this.logger.log('Error finding merchant', err);
      throw new BadRequestException(
        'Something went wrong while finding merchant',
      );
    }
  }
}
