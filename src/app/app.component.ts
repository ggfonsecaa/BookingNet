import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './models/loginModel';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'BookingNet';
    isLoggedIn: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        if (this.authService.ObtenerInformacionSesion()) {
            this.isLoggedIn = true;
            this.router.navigate(["/"]);
          } else {
            this.isLoggedIn = false;
          }
    }
}