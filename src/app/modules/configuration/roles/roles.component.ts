import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpReponseModel } from 'src/app/models/httpResponse';
import { RoleModel } from 'src/app/models/roleModel';
import { DrawerService } from 'src/app/services/drawer.service';
import { RolesService } from 'src/app/services/roles.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements AfterViewInit, OnInit, OnDestroy {
    isLoading!: boolean;
    displayedColumns: string[] = ['Id', 'Name'];
    dataSource: MatTableDataSource<RoleModel>;
    roles: RoleModel[] = [];
    selectedRole!: RoleModel;
    private selectedRoleSubscription!: Subscription;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    constructor(private router: Router, private roleService: RolesService, private spinnerService: SpinnerService, private drawerService: DrawerService) {
        this.dataSource = new MatTableDataSource(this.roles);
        this.spinnerService.isLoading$.subscribe((data) => {
            this.isLoading = data.valueOf();
        });
    }

    ngOnInit() {
        this.roleService.getAllRoles().subscribe((data: HttpReponseModel) => {
          this.dataSource.data = data.Data;
        });

        this.selectedRoleSubscription = this.roleService.selectedRole$.subscribe((data) => {
          this.selectedRole = data;
        });

        this.drawerService.setTittle('Roles');
    }

    ngOnDestroy(): void {
        this.selectedRoleSubscription.unsubscribe()
    }

    add() {
      this.router.navigateByUrl("/roles/add");
    }

    edit(item: any) {
        this.roleService.setSelectedRole(item);
        this.router.navigateByUrl("/roles/view");
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