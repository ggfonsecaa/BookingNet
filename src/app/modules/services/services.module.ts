import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ManagementComponent } from './management/management.component';
import { FormComponent as BookingForm } from './bookings/form/form.component';
import { FormComponent as ManagementForm } from './management/form/form.component';


@NgModule({
  declarations: [
    BookingsComponent,
    ManagementComponent,
    BookingForm,
    ManagementForm
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
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
export class ServicesModule { }
