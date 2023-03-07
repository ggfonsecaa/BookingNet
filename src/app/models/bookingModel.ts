import { BookingTypeModel } from "./bookingTypeModel"
import { FlowModel } from "./flowModel"
import { UserModel } from "./userModel"

export class BookingModel {
    Id?: number
    BookingDate?: Date
    Attendants?: number
    Comments?: string
    Price?: number
    Flows?: FlowModel[]
    BookingTypeId?: number
    BookingType?: BookingTypeModel
    UserId?: number
    User?: UserModel
}