import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDocument } from './payment.model';
import { PaymentRepository } from './payment.repository';
import { BookingService } from '../bookings/booking.service';
import { BookingStatuses } from 'src/utils/constants';
import { BookingDocument } from '../bookings/booking.model';
import { PaymentSuccessResponse } from './payment.types';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);

    constructor(
        private paymentRepository: PaymentRepository,
        private bookingService: BookingService,
    ) { }

    async create(createPaymentDto: CreatePaymentDto): Promise<PaymentSuccessResponse> {
        try {
            const { booking } = createPaymentDto
            const paymentCreated = await this.paymentRepository.create(createPaymentDto);
            const updatedBooking = await this.bookingService.update(booking, { status: BookingStatuses.PAID })

            return {
                paymentCreated,
                updatedBooking
            }
        } catch (error) {
            this.logger.error('Error creating payment', error);
            throw new BadRequestException('Failed to create payment');
        }
    }
}
