import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReviewController } from './review.controller';
import { Review, ReviewModel } from './review.model';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewModel, collection: 'reviews' },
    ]),
  ],
  providers: [ReviewService, ReviewRepository],
  exports: [],
  controllers: [ReviewController],
})
export class ReviewModule {}
