import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserModel } from 'src/app/models/userModel';
import { HttpReponseModel } from 'src/app/models/httpResponse';
import { HeaderService } from 'src/app/services/header.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements AfterViewInit, OnInit, OnDestroy {

  isLoading!: boolean;
  displayedColumns: string[] = ['Id', 'UserName', 'UserEmail'];
  dataSource: MatTableDataSource<UserModel>;
  users: UserModel[] = [];
  selectedUser!: UserModel;
  private selectedUserSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private router: Router, private userService: UsersService, private spinnerService: SpinnerService, private drawerService: DrawerService) {
      this.dataSource = new MatTableDataSource(this.users);
      this.spinnerService.isLoading$.subscribe((data) => {
          this.isLoading = data.valueOf();
      });
  }

  ngOnInit() {
      this.userService.getAllUsers().subscribe((data: HttpReponseModel) => {
        this.dataSource.data = data.Data;
      });

      this.selectedUserSubscription = this.userService.selectedUser$.subscribe((data) => {
        this.selectedUser = data;
      });

      this.drawerService.setTittle('Usuarios');
  }

  ngOnDestroy(): void {
      this.selectedUserSubscription.unsubscribe()
  }

  add() {
    this.router.navigateByUrl("/users/add");
  }

  edit(item: any) {
      this.userService.setSelectedUser(item);
      this.router.navigateByUrl("/users/view");
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