import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/models/bookingModel';
import { BookingTypeModel } from 'src/app/models/bookingTypeModel';
import { BookingsService } from 'src/app/services/bookings.service';
import { HeaderService } from 'src/app/services/header.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  validator: FormGroup = this.builder.group({
    'Id': [''],
    'BookingDate': ['', [Validators.required]],
    'Attendants': [0 , [Validators.required]],
    'Comments': ['' , [Validators.required]],
    'BookingTypeId': ['Seleccione una opción', [Validators.required]],
    'BookingType': ['']
  })

  isEditingMode!: boolean;
  isLoading!: boolean;
  isFirstFlow: boolean = true;

  listBookingTypes: BookingTypeModel[] = [];
  selectedBooking!: BookingModel;
  private selectedBookingSubscription!: Subscription;
  private selectedBookingTypeSubscription!: Subscription;

  constructor(private bookingServive: BookingsService,
      private builder: FormBuilder, 
      private router: Router, 
      private spinnerService: SpinnerService, 
      private activatedRoute: ActivatedRoute,
      private headerService: HeaderService,
      private dialog: MatDialog,
      public datepipe: DatePipe) 
  {
      this.spinnerService.isLoading$.subscribe((data) => {
          this.isLoading = data.valueOf();
      });
  }

  ngOnInit(): void {
      this.headerService.show('bookings');

      this.selectedBookingTypeSubscription = this.bookingServive.getAllBookingsTypes().subscribe((data) => {
        this.listBookingTypes = data.Data;
      });

      if (this.activatedRoute.snapshot.url[1].path == 'view') {
          this.isEditingMode = true;
          this.edit();
      } else {
          this.isEditingMode = false;
      }
  }

  ngOnDestroy(): void {
      if (this.selectedBookingSubscription) {
          this.selectedBookingSubscription.unsubscribe();
      }

      if (this.selectedBookingTypeSubscription) {
          this.selectedBookingTypeSubscription.unsubscribe();
      }

      this.headerService.hide();
  }

  edit() {
      this.selectedBookingSubscription = this.bookingServive.selectedBooking$.subscribe((data) => {
          this.selectedBooking = data;
      });
      
      if (!this.selectedBooking.Id) {
          this.router.navigateByUrl("/bookings");
      } else {
          this.validator.controls["Id"].setValue(this.selectedBooking.Id);
          this.validator.controls["BookingDate"].setValue(this.datepipe.transform(this.selectedBooking.BookingDate, 'yyyy-MM-dd'));
          this.validator.controls["Attendants"].setValue(this.selectedBooking.Attendants);
          this.validator.controls["Comments"].setValue(this.selectedBooking.Comments);
          this.validator.controls["BookingTypeId"].setValue(this.selectedBooking.BookingTypeId);
          this.validator.controls["BookingType"].setValue(this.selectedBooking.BookingType?.Name);

        if (this.selectedBooking.Flows?.length == 1) {
            this.isFirstFlow = true;
        } else {
            this.isFirstFlow = false;
        }
      }
  }

  onToolbarClick(item: any, modal: any): void {
      switch (item) {
          case 'eliminar' : {
              this.dialog.open(modal, {
                  width: '300px',
              })
              break;
          }
          case 'guardar' : {
                let booking = Object.assign(new BookingModel, this.validator.getRawValue());
                let objectLocalStorage = localStorage.getItem("datosSesion");
                if (objectLocalStorage) {
                    let dataLocalStorage = JSON.parse(objectLocalStorage);
                    booking.UserId = dataLocalStorage.Data.User.Id;
                }

                if (this.isEditingMode == true) {
                    this.bookingServive.updateBooking(booking).subscribe((data) => {
                        this.router.navigateByUrl("/bookings");
                    });
                } else {
                    this.bookingServive.createBooking(booking).subscribe((data) => {
                        this.router.navigateByUrl("/bookings");
                    });
                }
                break;
          }
      }
  }

  delete() {
      this.bookingServive.deleteBooking(this.selectedBooking.Id).subscribe((data) => {
          this.dialog.closeAll();
          this.router.navigateByUrl("/bookings");
      });
  }
}