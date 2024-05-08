import {
  Controller,
  Get
} from '@nestjs/common';

import { MerchantService } from './merchant.service';
import { Merchant } from './merchant.model';

@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) { }

  @Get()
  async getAllMerchants(): Promise<Merchant[]> {
    return await this.merchantService.getAllMerchants();
  }
}
