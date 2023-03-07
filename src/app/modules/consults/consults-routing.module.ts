import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { ReportsComponent } from './reports/reports.component';
import { FormComponent as HistoryForm } from './history/form/form.component';
import { FormComponent as ReportForm } from './reports/form/form.component';

const routes: Routes = [
  { path: 'history', component: HistoryComponent },
  { path: 'history/add', component: HistoryForm },
  { path: 'history/view', component: HistoryForm },
  { path: 'report', component: ReportsComponent },
  { path: 'report/add', component: ReportForm },
  { path: 'report/view', component: ReportForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultsRoutingModule { }
