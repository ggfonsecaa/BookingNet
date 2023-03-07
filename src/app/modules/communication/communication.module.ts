import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationRoutingModule } from './communication-routing.module';
import { ComingComponent } from './coming/coming.component';
import { FormComponent } from './coming/form/form.component';


@NgModule({
  declarations: [
    ComingComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule
  ]
})
export class CommunicationModule { }
