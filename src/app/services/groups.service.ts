import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GroupModel } from '../models/groupModel';
import { HttpReponseModel } from '../models/httpResponse';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private selectedGroup = new BehaviorSubject<GroupModel>(new GroupModel());
  selectedGroup$ = this.selectedGroup.asObservable();

  apiUrl: string = "https://localhost:7204/api/v1/groups"
  groupList!: GroupModel[];
  group!: GroupModel;

  constructor(private http: HttpClient) { 

  }

  setSelectedGroup(group: GroupModel): void {
      this.selectedGroup.next(group);
  }

  getAllGroups(): Observable<HttpReponseModel> {
    return this.http.get<HttpReponseModel>(this.apiUrl);
  }

  getGroupById(id: number | undefined): Observable<HttpReponseModel> {
    return this.http.get<HttpReponseModel>(`${this.apiUrl}/${id}`);
  }

  createGroup(group: GroupModel): Observable<HttpReponseModel> {
    return this.http.post<HttpReponseModel>(`${this.apiUrl}`, group);
  }

  updateGroup(group: GroupModel): Observable<HttpReponseModel> {
    return this.http.put<HttpReponseModel>(`${this.apiUrl}`, group);
  }

  deleteGroup(id: number | undefined): Observable<HttpReponseModel> {
    return this.http.delete<HttpReponseModel>(`${this.apiUrl}/${id}`);
  }
}