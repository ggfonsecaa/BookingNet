import { UserModel } from "./userModel";

export class LoginModel {
    User?: UserModel
    Token?: string
    IsLoggedIn: boolean = false;
}