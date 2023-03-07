import { Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpReponseModel } from '../models/httpResponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private selectedUser = new BehaviorSubject<UserModel>(new UserModel());
    selectedUser$ = this.selectedUser.asObservable();

    apiUrl: string = "https://localhost:7204/api/v1/users"
    userList!: UserModel[];
    user!: UserModel;

    constructor(private http: HttpClient) { 

    }

    setSelectedUser(user: UserModel): void {
        this.selectedUser.next(user);
    }

    getAllUsers(): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(this.apiUrl);
    }

    getUserById(id: number | undefined): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(`${this.apiUrl}/${id}/groups`);
    }

    getUserByUserName(userName: string | undefined): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(`${this.apiUrl}/search?username=${userName}`);
    }

    createUser(user: UserModel): Observable<HttpReponseModel> {
      return this.http.post<HttpReponseModel>(`${this.apiUrl}`, user);
    }

    createUserGroup(idUser: any, group: any): Observable<HttpReponseModel> {
      return this.http.post<HttpReponseModel>(`${this.apiUrl}/${idUser}/groups`, group);
    }

    updateUser(user: UserModel): Observable<HttpReponseModel> {
      return this.http.put<HttpReponseModel>(`${this.apiUrl}`, user);
    }

    deleteUser(id: number | undefined): Observable<HttpReponseModel> {
      return this.http.delete<HttpReponseModel>(`${this.apiUrl}/${id}`);
    }
}