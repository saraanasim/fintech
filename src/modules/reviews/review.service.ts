import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDocument } from './review.model';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
    private readonly logger = new Logger(ReviewService.name);

    constructor(
        private reviewRepository: ReviewRepository,
    ) { }

    async create(createReviewDto: CreateReviewDto): Promise<ReviewDocument> {
        try {
            return await this.reviewRepository.create(createReviewDto);

        } catch (error) {
            this.logger.error('Error creating review', error);
            throw new BadRequestException('Failed to create review');
        }
    }
}
