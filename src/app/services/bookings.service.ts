import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingModel } from '../models/bookingModel';
import { HttpReponseModel } from '../models/httpResponse';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

    private selectedBooking = new BehaviorSubject<BookingModel>(new BookingModel());
    selectedBooking$ = this.selectedBooking.asObservable();

    apiUrl: string = "https://localhost:7204/api/v1/bookings"
    bookingList!: BookingModel[];
    booking!: BookingModel;

    constructor(private http: HttpClient) { 

    }

    setSelectedBooking(booking: BookingModel): void {
        this.selectedBooking.next(booking);
    }

    getAllBookings(): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(this.apiUrl);
    }

    getAllManageBookings(): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(`${this.apiUrl}/manage`);
    }

    getAllBookingsTypes(): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(`${this.apiUrl}/types`);
    }

    getBookingById(id: number | undefined): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(`${this.apiUrl}/${id}`);
    }

    getBookingHistory(id: number | undefined): Observable<HttpReponseModel> {
      return this.http.get<HttpReponseModel>(`${this.apiUrl}/history/${id}`);
    }

    createBooking(booking: BookingModel): Observable<HttpReponseModel> {
      return this.http.post<HttpReponseModel>(`${this.apiUrl}`, booking);
    }

    aproveBooking(booking: BookingModel): Observable<HttpReponseModel> {
      return this.http.put<HttpReponseModel>(`${this.apiUrl}/aprove`, booking);
    }

    declineBooking(booking: BookingModel): Observable<HttpReponseModel> {
      return this.http.put<HttpReponseModel>(`${this.apiUrl}/decline`, booking);
    }

    updateBooking(booking: BookingModel): Observable<HttpReponseModel> {
      return this.http.put<HttpReponseModel>(`${this.apiUrl}`, booking);
    }

    deleteBooking(id: number | undefined): Observable<HttpReponseModel> {
      return this.http.delete<HttpReponseModel>(`${this.apiUrl}/${id}`);
    }
}
