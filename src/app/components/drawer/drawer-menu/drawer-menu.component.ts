import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoleModel } from 'src/app/models/roleModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-drawer-menu',
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.css']
})

export class DrawerMenuComponent {

    // @ViewChild('Inicio') menuInicio!: TemplateRef<any>;
    @ViewChild('Servicios') menuServicios!: TemplateRef<any>;
    @ViewChild('Inventarios') menuInventarios!: TemplateRef<any>;
    @ViewChild('Comunicaciones') menuComunicaciones!: TemplateRef<any>;
    @ViewChild('Consultas') menuReportes!: TemplateRef<any>;
    @ViewChild('Configuracion') menuConfiguracion!: TemplateRef<any>;
    @ViewChild('Perfil') perfil!: TemplateRef<any>;

    menuToShow!: TemplateRef<any>;

    roleUser!: string;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        let dataUser = this.authService.ObtenerInformacionSesion();
        dataUser.Data.User.Groups.forEach((group: { Group: { Role: RoleModel; }; }) => {
            if (group.Group.Role.Name == 'Administradores') {
                this.roleUser = 'Administradores';
            } else if (group.Group.Role.Name == 'Usuarios') {
                this.roleUser = 'Usuarios';
            } else {
                this.roleUser = 'Clientes';
            }
        });
    }
}