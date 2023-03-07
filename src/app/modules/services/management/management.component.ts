import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/models/bookingModel';
import { HttpReponseModel } from 'src/app/models/httpResponse';
import { BookingsService } from 'src/app/services/bookings.service';
import { DrawerService } from 'src/app/services/drawer.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements AfterViewInit, OnInit, OnDestroy {

  isLoading!: boolean;
  displayedColumns: string[] = ['Id', 'BookingDate', 'Attendants', 'BookingType'];
  dataSource: MatTableDataSource<BookingModel>;
  bookings: BookingModel[] = [];
  selectedBooking!: BookingModel;
  private selectedBookingSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private router: Router, private bookingService: BookingsService, private spinnerService: SpinnerService, private drawerService: DrawerService) {
      this.dataSource = new MatTableDataSource(this.bookings);
      this.spinnerService.isLoading$.subscribe((data) => {
          this.isLoading = data.valueOf();
      });
  }

  ngOnInit() {
      this.bookingService.getAllManageBookings().subscribe((data: HttpReponseModel) => {
        this.dataSource.data = data.Data;
      });

      this.selectedBookingSubscription = this.bookingService.selectedBooking$.subscribe((data) => {
        this.selectedBooking = data;
      });

      this.drawerService.setTittle('Gestión de reservas');
  }

  ngOnDestroy(): void {
      this.selectedBookingSubscription.unsubscribe()
  }

  add() {
    this.router.navigateByUrl("/manage-bookings/add");
  }

  edit(item: any) {
      this.bookingService.setSelectedBooking(item);
      this.router.navigateByUrl("/manage-bookings/view");
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
