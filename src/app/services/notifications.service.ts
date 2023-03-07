import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpReponseModel } from '../models/httpResponse';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    apiUrl: string = "https://localhost:7204/api/v1/notifications"

    constructor(private http: HttpClient) { 

    }

    getAllNotificationsTypes(): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(`${this.apiUrl}/types`);
    }

    getAllNotificationsWays(): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(`${this.apiUrl}/ways`);
    }

    // getRoleById(id: number | undefined): Observable<HttpReponseModel> {
    //   return this.http.get<HttpReponseModel>(`${this.apiUrl}/${id}`);
    // }

    // createRole(role: RoleModel): Observable<HttpReponseModel> {
    //   return this.http.post<HttpReponseModel>(`${this.apiUrl}`, role);
    // }

    // updateRole(role: RoleModel): Observable<HttpReponseModel> {
    //   return this.http.put<HttpReponseModel>(`${this.apiUrl}`, role);
    // }

    // deleteRole(id: number | undefined): Observable<HttpReponseModel> {
    //   return this.http.delete<HttpReponseModel>(`${this.apiUrl}/${id}`);
    // }
}
