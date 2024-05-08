import { BookingDocument } from "../bookings/booking.model"
import { PaymentDocument } from "./payment.model"

export type PaymentSuccessResponse = {
    paymentCreated: PaymentDocument
    updatedBooking: BookingDocument
}