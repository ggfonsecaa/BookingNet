import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { FormComponent as BookingForm } from './bookings/form/form.component';
import { ManagementComponent } from './management/management.component';
import { FormComponent as ManagementForm } from './management/form/form.component';

const routes: Routes = [
  { path: 'bookings', component: BookingsComponent },
  { path: 'bookings/add', component: BookingForm },
  { path: 'bookings/view', component: BookingForm },
  { path: 'manage-bookings', component: ManagementComponent },
  { path: 'manage-bookings/add', component: ManagementForm },
  { path: 'manage-bookings/view', component: ManagementForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
