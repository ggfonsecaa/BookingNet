import { Component, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { DrawerMenuComponent } from '../drawer-menu/drawer-menu.component';

@Component({
  selector: 'app-drawer-expand-maximized',
  templateUrl: './drawer-expand-maximized.component.html',
  styleUrls: ['./drawer-expand-maximized.component.css']
})
export class DrawerExpandMaximizedComponent {

  tittle: string = 'Servicios';
  visible: string = '';

  @ViewChild(DrawerMenuComponent) menuDrawer!: DrawerMenuComponent;

  loadMenu(item: string): void{
      switch (item) {
          // case 'Inicio': { 
          //   this.menuDrawer.menuToShow = this.menuDrawer.menuInicio 
          //   break;
          // }
          case 'Servicios': { 
            this.menuDrawer.menuToShow = this.menuDrawer.menuServicios
            break;
          }
          case 'Inventarios': { 
            this.menuDrawer.menuToShow = this.menuDrawer.menuInventarios
            break;
          }
          case 'Comunicaciones': { 
            this.menuDrawer.menuToShow = this.menuDrawer.menuComunicaciones 
            break;
          }
          case 'Consultas': {
            this.menuDrawer.menuToShow = this.menuDrawer.menuReportes
            break;
          }
          case 'Configuracion': { 
            this.menuDrawer.menuToShow = this.menuDrawer.menuConfiguracion
            break;
          }
          case 'Perfil': { 
            this.menuDrawer.menuToShow = this.menuDrawer.perfil
            break;
          }
      }
  }

  toggle(): void {
    if (this.visible == '') {
        this.visible = 'hidden';
    } else {
        this.visible = '';
    }
  }
}