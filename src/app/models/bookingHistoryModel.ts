import { BookingModel } from "./bookingModel"
import { FlowModel } from "./flowModel"

export class BookingsFlowsModel {
    Id?: number
    BookingId?: number
    Booking?: BookingModel
    FlowId?: number
    Flow?: FlowModel
    DateStartFlow?: Date
    DateEndFlow?: Date
}