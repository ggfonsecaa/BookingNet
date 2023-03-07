import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FormComponent } from './myprofile/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    MyprofileComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
export class ProfileModule { }
