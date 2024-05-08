import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../common/config/config.module';
import { ConfigService } from '../common/config/config.service';
import { UserModule } from '../users/user.module';
import { MerchantModule } from '../merchants/merchant.module';
import { BookingModule } from '../bookings/booking.module';

@Module({
  imports: [
    //Mongo db connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ConfigModule,
    UserModule,
    MerchantModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
