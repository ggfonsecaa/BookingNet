import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit, OnDestroy {
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.EliminarInformacionSesion();
        this.router.navigate(['auth/login']);
    }

    
  ngOnDestroy(): void {
    window.location.reload();
  }

}
