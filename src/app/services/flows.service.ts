import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlowModel } from '../models/flowModel';
import { HttpReponseModel } from '../models/httpResponse';

@Injectable({
  providedIn: 'root'
})
export class FlowsService {

  private selectedFlow = new BehaviorSubject<FlowModel>(new FlowModel());
  selectedFlow$ = this.selectedFlow.asObservable();

  apiUrl: string = "https://localhost:7204/api/v1/flows"
  flowList!: FlowModel[];
  flow!: FlowModel;

  constructor(private http: HttpClient) { 

  }

  setSelectedFlow(flow: FlowModel): void {
      this.selectedFlow.next(flow);
  }

  getAllFlows(): Observable<HttpReponseModel> {
    return this.http.get<HttpReponseModel>(this.apiUrl);
  }

  getFlowById(id: number | undefined): Observable<HttpReponseModel> {
    return this.http.get<HttpReponseModel>(`${this.apiUrl}/${id}`);
  }

  createFlow(flow: FlowModel): Observable<HttpReponseModel> {
    return this.http.post<HttpReponseModel>(`${this.apiUrl}`, flow);
  }

  updateFlow(flow: FlowModel): Observable<HttpReponseModel> {
    return this.http.put<HttpReponseModel>(`${this.apiUrl}`, flow);
  }

  deleteFlow(id: number | undefined): Observable<HttpReponseModel> {
    return this.http.delete<HttpReponseModel>(`${this.apiUrl}/${id}`);
  }
}
