import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer/drawer.component';
import { DrawerExpandComponent } from './drawer-expand/drawer-expand.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { ButtonComponent } from '../button/button.component';
import { DrawerExpandMinimizedComponent } from './drawer-expand-minimized/drawer-expand-minimized.component';
import { DrawerExpandMaximizedComponent } from './drawer-expand-maximized/drawer-expand-maximized.component';
import { MenuComponent } from '../menu/menu.component';
import { DrawerMenuComponent } from './drawer-menu/drawer-menu.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';



@NgModule({
  declarations: [
    DrawerComponent,
    DrawerExpandComponent,
    DrawerContentComponent,
    DrawerExpandMinimizedComponent,
    DrawerExpandMaximizedComponent,
    DrawerMenuComponent
  ],
  imports: [
    CommonModule,
    ButtonComponent,
    MenuComponent,
    HeaderComponent,
    RouterModule,
    ToolbarComponent
  ],
  exports: [
    DrawerComponent
  ]
})
export class DrawerModule { }
