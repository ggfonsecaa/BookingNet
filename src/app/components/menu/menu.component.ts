import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { RoleModel } from 'src/app/models/roleModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
    @Output() onMenuClick: EventEmitter<string> = new EventEmitter();

    onMenuItemClick(item: string) {
        this.onMenuClick.emit(item);
    }

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