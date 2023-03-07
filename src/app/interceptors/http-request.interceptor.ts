import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  token: string = '';

  constructor(private spinnerService: SpinnerService, private authService: AuthService) {
      this.token = this.authService.ObtenerToken()
  }



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    const modifiedReq = request.clone({ 
      headers: request.headers.set('Authorization', `Bearer ${this.token}`),
    });
    return next.handle(modifiedReq).pipe(
        finalize(() => this.spinnerService.hide()));
  }
}
