import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantModel } from './merchant.model';
import { MerchantService } from './merchant.service';
import { MerchantRepository } from './merchant.repository';
import { MerchantController } from './merchant.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Merchant.name, schema: MerchantModel, collection: 'merchants' },
    ]),
  ],
  providers: [MerchantService, MerchantRepository],
  exports: [MerchantService],
  controllers: [MerchantController],
})
export class MerchantModule {}
