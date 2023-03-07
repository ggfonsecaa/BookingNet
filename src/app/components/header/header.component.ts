import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { HeaderService } from 'src/app/services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    showBackButton!: boolean;
    routeBack!: string;

    constructor(private headerService: HeaderService, private router: Router) {
        
    }

    ngOnInit(): void {
        this.headerService.backButton$.subscribe((data) => {
            this.showBackButton = data;
        })

        this.headerService.routeBack$.subscribe((data) => {
          this.routeBack = data;
        })
    }

    regresar() {
        this.router.navigateByUrl(this.routeBack);
        this.headerService.hide();
    }
}
