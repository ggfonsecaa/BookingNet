import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultsRoutingModule } from './consults-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { HistoryComponent } from './history/history.component';
import { ReportsComponent } from './reports/reports.component';
import { FormComponent as HistoryForm } from './history/form/form.component';
import { FormComponent as ReportForm } from './reports/form/form.component';


@NgModule({
  declarations: [
    HistoryComponent,
    HistoryForm,
    ReportsComponent,
    ReportForm
  ],
  imports: [
    CommonModule,
    ConsultsRoutingModule,
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
export class ConsultsModule { }
