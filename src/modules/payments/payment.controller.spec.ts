import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { BookingService } from '../bookings/booking.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepositoryMock: Partial<PaymentRepository>;
  let bookingServiceMock: Partial<BookingService>;

  beforeEach(async () => {
    paymentRepositoryMock = {
      create: jest.fn().mockResolvedValue({
        _id: '1',
        amount: 100,
        paymentMethodId: 'stripe_123',
        booking: 'booking_id',
        user: 'user_id',
      }),
    };
    bookingServiceMock = {
      update: jest.fn().mockResolvedValue({
        _id: 'booking_id',
        status: 'PAID',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PaymentRepository, useValue: paymentRepositoryMock },
        { provide: BookingService, useValue: bookingServiceMock },
        { provide: getModelToken('Payment'), useValue: {} },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment and update the booking status', async () => {
      const createPaymentDto = { amount: 100, paymentMethodId: 'stripe_123', booking: 'booking_id', user: 'user_id' };
      const paymentSuccessResponse = await service.create(createPaymentDto);
      expect(paymentSuccessResponse).toHaveProperty('paymentCreated');
      expect(paymentSuccessResponse).toHaveProperty('updatedBooking');
      expect(paymentSuccessResponse.paymentCreated).toHaveProperty('_id', '1');
      expect(paymentSuccessResponse.paymentCreated).toHaveProperty('amount', 100);
      expect(paymentSuccessResponse.paymentCreated).toHaveProperty('paymentMethodId', 'stripe_123');
      expect(paymentSuccessResponse.updatedBooking).toHaveProperty('_id', 'booking_id');
      expect(paymentSuccessResponse.updatedBooking).toHaveProperty('status', 'PAID');
    });
  });
});
