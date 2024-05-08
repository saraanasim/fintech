import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewServiceMock: Partial<ReviewService>;

  beforeEach(async () => {
    reviewServiceMock = {
      create: jest.fn().mockResolvedValue({
        _id: '1',
        content: 'Great service!',
        rating: 5,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [{ provide: ReviewService, useValue: reviewServiceMock }],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const createReviewDto = { content: 'Great service!', rating: 5,user:'663bc417709dc5937f864a7d' };
      const createdReview = await controller.create(createReviewDto);
      expect(createdReview).toHaveProperty('_id', '1');
      expect(createdReview).toHaveProperty('content', 'Great service!');
      expect(createdReview).toHaveProperty('rating', 5);
    });
  });
});
