import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupModel } from 'src/app/models/groupModel';
import { HttpReponseModel } from 'src/app/models/httpResponse';
import { DrawerService } from 'src/app/services/drawer.service';
import { GroupsService } from 'src/app/services/groups.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements AfterViewInit, OnInit, OnDestroy {

  isLoading!: boolean;
  displayedColumns: string[] = ['Id', 'Name', 'Role'];
  dataSource: MatTableDataSource<GroupModel>;
  groups: GroupModel[] = [];
  selectedGroup!: GroupModel;
  private selectedGroupSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private router: Router, private groupService: GroupsService, private spinnerService: SpinnerService, private drawerService: DrawerService) {
      this.dataSource = new MatTableDataSource(this.groups);
      this.spinnerService.isLoading$.subscribe((data) => {
          this.isLoading = data.valueOf();
      });
  }

  ngOnInit() {
      this.groupService.getAllGroups().subscribe((data: HttpReponseModel) => {
        this.dataSource.data = data.Data;
      });

      this.selectedGroupSubscription = this.groupService.selectedGroup$.subscribe((data) => {
        this.selectedGroup = data;
      });

      this.drawerService.setTittle('Grupos');
  }

  ngOnDestroy(): void {
      this.selectedGroupSubscription.unsubscribe()
  }

  add() {
    this.router.navigateByUrl("/groups/add");
  }

  edit(item: any) {
      this.groupService.setSelectedGroup(item);
      this.router.navigateByUrl("/groups/view");
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