import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking';
import { Booking, BookingModel } from './booking.model';
import { BookingStatuses } from 'src/utils/constants';

describe('BookingController', () => {
    let controller: BookingController;
    let service: BookingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookingController],
            providers: [
                BookingService,
                BookingRepository,
                {
                    provide: getModelToken(Booking.name),
                    useValue: BookingModel,
                },
            ],
        }).compile();

        controller = module.get<BookingController>(BookingController);
        service = module.get<BookingService>(BookingService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a booking', async () => {
            const bookingDto: CreateBookingDto = {
                merchant:'663bd477709dc5937f864a7f',
                user:'663bc417709dc5937f864a7d',
                status:BookingStatuses.PENDING
            };

            jest.spyOn(service, 'create').mockResolvedValueOnce(bookingDto as any);

            const result = await controller.create(bookingDto);
            expect(result).toEqual(bookingDto);
        });
    });

    describe('markCompleted', () => {
        it('should mark a booking as completed', async () => {
            const bookingId = 'booking_id';
            const updateBookingDto: UpdateBookingDto = {
                status:BookingStatuses.COMPLETED
            };

            jest.spyOn(service, 'update').mockResolvedValueOnce(updateBookingDto as any);

            const result = await controller.markCompleted(updateBookingDto, bookingId);
            expect(result).toEqual(updateBookingDto);
        });
    });
});
