import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './review.model';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async create(payload: CreateReviewDto): Promise<ReviewDocument> {
    try {
      const createdReview = new this.reviewModel(payload);
      return createdReview.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
