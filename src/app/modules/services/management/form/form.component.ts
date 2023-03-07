import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
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
    'BookingDate': ['' ],
    'Attendants': [0 ],
    'Comments': ['' ],
    'BookingTypeId': [''],
    'BookingType': [''],
    'User': [''],
    'Flow': ['', ],
    'Price': [0 , ],
    'AditionalComments': ['' ,]
  })

  isEditingMode!: boolean;
  isLoading!: boolean;
  isFirstFlow: boolean = true;
  isLastFlow: boolean = false;

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
      this.headerService.show('manage-bookings');

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
          this.router.navigateByUrl("/manage-bookings");
      } else {
          this.validator.controls["Id"].setValue(this.selectedBooking.Id);
          this.validator.controls["BookingDate"].setValue(this.datepipe.transform(this.selectedBooking.BookingDate, 'yyyy-MM-dd'));
          this.validator.controls["Attendants"].setValue(this.selectedBooking.Attendants);
          this.validator.controls["Comments"].setValue(this.selectedBooking.Comments);
          this.validator.controls["BookingTypeId"].setValue(this.selectedBooking.BookingTypeId);
          this.validator.controls["BookingType"].setValue(this.selectedBooking.BookingType?.Name);
          this.validator.controls["User"].setValue(this.selectedBooking.User?.UserName);
          this.validator.controls["Flow"].setValue(this.selectedBooking.Flows?.reverse()[0].Flow?.Name);
          this.validator.controls["Price"].setValue(this.selectedBooking.Price);
          this.validator.controls["AditionalComments"].setValue("");

        if (this.selectedBooking.Flows?.[0].Flow?.BookingStatusId == 6 || this.selectedBooking.Flows?.[0].Flow?.BookingStatusId == 7) {
            this.isLastFlow = true;
        } else {
            this.isLastFlow = false;
        }

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

              if (this.isEditingMode == true) {
                  this.bookingServive.updateBooking(booking).subscribe((data) => {
                      this.router.navigateByUrl("/manage-bookings");
                  });
              } else {
                  this.bookingServive.createBooking(booking).subscribe((data) => {
                      this.router.navigateByUrl("/manage-bookings");
                  });
              }
              break;
          }
          case 'aprobar' : {
            let booking = Object.assign(new BookingModel, this.validator.getRawValue());

            this.bookingServive.aproveBooking(booking).subscribe((data) => {
                this.router.navigateByUrl("/manage-bookings");
            });

            break;
        }
        case 'rechazar' : {
            let booking = Object.assign(new BookingModel, this.validator.getRawValue());

            this.bookingServive.declineBooking(booking).subscribe((data) => {
                this.router.navigateByUrl("/manage-bookings");
            });

            break;
        }
      }
  }

  delete() {
      this.bookingServive.deleteBooking(this.selectedBooking.Id).subscribe((data) => {
          this.dialog.closeAll();
          this.router.navigateByUrl("/manage-bookings");
      });
  }
}