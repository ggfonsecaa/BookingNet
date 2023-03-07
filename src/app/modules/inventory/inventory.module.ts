import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { ProductsComponent } from './products/products.component';
import { FormComponent } from './products/form/form.component';


@NgModule({
  declarations: [
    ProductsComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
