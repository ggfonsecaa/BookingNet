import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpReponseModel } from '../models/httpResponse';
import { RoleModel } from '../models/roleModel';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private selectedRole = new BehaviorSubject<RoleModel>(new RoleModel());
  selectedRole$ = this.selectedRole.asObservable();

  apiUrl: string = "https://localhost:7204/api/v1/roles"
  roleList!: RoleModel[];
  role!: RoleModel;

  constructor(private http: HttpClient) { 

  }

  setSelectedRole(role: RoleModel): void {
      this.selectedRole.next(role);
  }

  getAllRoles(): Observable<HttpReponseModel> {
    return this.http.get<HttpReponseModel>(this.apiUrl);
  }

  getRoleById(id: number | undefined): Observable<HttpReponseModel> {
    return this.http.get<HttpReponseModel>(`${this.apiUrl}/${id}`);
  }

  createRole(role: RoleModel): Observable<HttpReponseModel> {
    return this.http.post<HttpReponseModel>(`${this.apiUrl}`, role);
  }

  updateRole(role: RoleModel): Observable<HttpReponseModel> {
    return this.http.put<HttpReponseModel>(`${this.apiUrl}`, role);
  }

  deleteRole(id: number | undefined): Observable<HttpReponseModel> {
    return this.http.delete<HttpReponseModel>(`${this.apiUrl}/${id}`);
  }
}
