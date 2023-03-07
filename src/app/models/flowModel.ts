import { BookingStatusModel } from "./bookingStatusModel"
import { UserModel } from "./userModel"

export class FlowModel {
    Id?: number
    Name?: string
    HasPreviousFlow?: boolean
    FlowId?: number
    Flow?: FlowModel
    UserId?: number
    User?: UserModel
    BookingStatusId?: number
    BookingStatus?: BookingStatusModel
}