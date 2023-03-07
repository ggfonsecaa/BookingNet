import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    validator: FormGroup = this.builder.group({
      'UserEmail': ['', [Validators.required, Validators.email]],
      'PassWord': ['', [Validators.required, Validators.minLength(8)]]
    })

    constructor(private builder: FormBuilder, private authService: AuthService, private router: Router) {

    }

    iniciarSesion() {
        let email = this.validator.controls["UserEmail"].value;
        let password = this.validator.controls["PassWord"].value;
        
        this.authService.IdentificarUsuario(email, password).subscribe((data) => {
          this.authService.AlmacenarSesion(data);
          this.router.navigate(["/services/bookings"]);
          window.location.reload();
        })
    }
}
