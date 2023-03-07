import { Component } from '@angular/core';
import { DrawerExpandMaximizedComponent } from '../drawer-expand-maximized/drawer-expand-maximized.component';

@Component({
  selector: 'app-drawer-expand-minimized',
  templateUrl: './drawer-expand-minimized.component.html',
  styleUrls: ['./drawer-expand-minimized.component.css']
})

export class DrawerExpandMinimizedComponent {

  contentExpanded!: DrawerExpandMaximizedComponent;

  onToggleDrawer(): void {
    this.contentExpanded.toggle()
  }

  onMenuClick(item: string): void {
      this.contentExpanded.tittle = item;
      this.contentExpanded.loadMenu(item);
  }
}