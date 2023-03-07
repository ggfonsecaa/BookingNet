import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlowModel } from 'src/app/models/flowModel';
import { HttpReponseModel } from 'src/app/models/httpResponse';
import { DrawerService } from 'src/app/services/drawer.service';
import { FlowsService } from 'src/app/services/flows.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.css']
})
export class FlowsComponent implements AfterViewInit, OnInit, OnDestroy {

  isLoading!: boolean;
  displayedColumns: string[] = ['Id', 'Name', 'HasPreviousFlow'];
  dataSource: MatTableDataSource<FlowModel>;
  flows: FlowModel[] = [];
  selectedFlow!: FlowModel;
  private selectedFlowSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private router: Router, private flowService: FlowsService, private spinnerService: SpinnerService, private drawerService: DrawerService) {
      this.dataSource = new MatTableDataSource(this.flows);
      this.spinnerService.isLoading$.subscribe((data) => {
          this.isLoading = data.valueOf();
      });
  }

  ngOnInit() {
      this.flowService.getAllFlows().subscribe((data: HttpReponseModel) => {
        this.dataSource.data = data.Data;
      });

      this.selectedFlowSubscription = this.flowService.selectedFlow$.subscribe((data) => {
        this.selectedFlow = data;
      });

      this.drawerService.setTittle('Flujos de procesos');
  }

  ngOnDestroy(): void {
      this.selectedFlowSubscription.unsubscribe()
  }

  add() {
    this.router.navigateByUrl("/flows/add");
  }

  edit(item: any) {
      this.flowService.setSelectedFlow(item);
      this.router.navigateByUrl("/flows/view");
  }

  ngAfterViewInit() {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }

}
