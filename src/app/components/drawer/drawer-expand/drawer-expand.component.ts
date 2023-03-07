import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DrawerExpandMaximizedComponent } from '../drawer-expand-maximized/drawer-expand-maximized.component';
import { DrawerExpandMinimizedComponent } from '../drawer-expand-minimized/drawer-expand-minimized.component';

@Component({
  selector: 'app-drawer-expand',
  templateUrl: './drawer-expand.component.html',
  styleUrls: ['./drawer-expand.component.css']
})
export class DrawerExpandComponent implements AfterViewInit {

  @ViewChild(DrawerExpandMaximizedComponent) drawerMaximized!: DrawerExpandMaximizedComponent;
  @ViewChild(DrawerExpandMinimizedComponent) drawerMinimized!: DrawerExpandMinimizedComponent;

  ngAfterViewInit() {
    this.drawerMinimized.contentExpanded = this.drawerMaximized;
  }
}
