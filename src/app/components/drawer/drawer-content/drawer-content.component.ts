import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.css']
})
export class DrawerContentComponent implements OnInit {
    tittleSection: string = '';

    constructor( private drawerService: DrawerService) {

    }

    ngOnInit(): void {
      this.drawerService.tittleSection$.subscribe((data) => {
          this.tittleSection = data;
      })
    }
}
