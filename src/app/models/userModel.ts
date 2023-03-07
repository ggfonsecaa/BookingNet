import { NotificationWayModel } from "./notificationWayModel"
import { UsersGroupsModel } from "./usersGroupsModel"

export class UserModel {
    Id?: number
    UserName?: string
    UserEmail?: string
    PassWord?: string
    NotificationWayId?: number
    NOtificationWay?: NotificationWayModel
    Groups?: UsersGroupsModel[]
}