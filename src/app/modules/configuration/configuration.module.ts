import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { UsersComponent } from './users/users.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { FormComponent as UserForm } from './users/form/form.component';
import { FormComponent as GroupForm } from './groups/form/form.component';
import { FormComponent as RoleForm } from './roles/form/form.component';
import { FormComponent as FlowForm } from './flows/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { GroupsComponent } from './groups/groups.component';
import { RolesComponent } from './roles/roles.component';
import { FlowsComponent } from './flows/flows.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserForm,
    GroupForm,
    RoleForm,
    FlowForm,
    GroupsComponent,
    RolesComponent,
    FlowsComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ToolbarComponent,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ButtonComponent 
  ]
})

export class ConfigurationModule { }