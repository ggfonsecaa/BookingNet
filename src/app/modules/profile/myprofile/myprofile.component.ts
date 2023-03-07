import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupModel } from 'src/app/models/groupModel';
import { NotificationWayModel } from 'src/app/models/notificationWayModel';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
import { HeaderService } from 'src/app/services/header.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit, OnDestroy {

  validator: FormGroup = this.builder.group({
      'Id': [''],
      'UserName': ['', [Validators.required, Validators.maxLength(30)]],
      'UserEmail': ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      'NotificationWayId': ['Seleccione una opción' , [Validators.required]],
      'GroupId': ['Seleccione una opción' , [Validators.required]]
  })

  isEditingMode!: boolean;
  isLoading!: boolean;
  displayedColumns: string[] = ['Id', 'Name', 'Role'];
  dataSource: MatTableDataSource<GroupModel>;
  groups: GroupModel[] = [];
  listNotificationWays: NotificationWayModel[] = [];
  listGroups: GroupModel[] = [];
  
  selectedUser!: UserModel;
  private selectedUserSubscription!: Subscription;
  private notificationSubscription!: Subscription;
  private groupSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UsersService, 
      private builder: FormBuilder, 
      private notificationService: NotificationsService,
      private groupService: GroupsService,
      private router: Router, 
      private spinnerService: SpinnerService, 
      private activatedRoute: ActivatedRoute,
      private headerService: HeaderService,
      private dialog: MatDialog,
      private authService: AuthService) 
  {
      this.dataSource = new MatTableDataSource(this.groups);
      this.spinnerService.isLoading$.subscribe((data) => {
          this.isLoading = data.valueOf();
      });
  }

  ngOnInit(): void {

      this.notificationSubscription = this.notificationService.getAllNotificationsWays().subscribe((data) => {
          this.listNotificationWays = data.Data;
      });

      this.groupSubscription = this.groupService.getAllGroups().subscribe((data) => {
          this.listGroups = data.Data;
      });

      this.isEditingMode = true;
      this.edit();
  }

  ngOnDestroy(): void {
      if (this.selectedUserSubscription) {
          this.selectedUserSubscription.unsubscribe();
      }

      if (this.notificationSubscription) {
          this.notificationSubscription.unsubscribe();
      }

      if (this.groupSubscription) {
          this.groupSubscription.unsubscribe();
      }

      this.headerService.hide();
  }

  edit() {
    
    let dataUser = this.authService.ObtenerInformacionSesion();

    this.selectedUserSubscription = this.userService.getUserByUserName(dataUser.Data.User.UserName).subscribe((data) => {
        this.selectedUser = data.Data[0];
        this.validator.controls["Id"].setValue(this.selectedUser.Id);
        this.validator.controls["UserName"].setValue(this.selectedUser.UserName);
        this.validator.controls["UserEmail"].setValue(this.selectedUser.UserEmail);
        this.validator.controls["NotificationWayId"].setValue(this.selectedUser.NotificationWayId);
    });
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
              let user = Object.assign(new UserModel, this.validator.getRawValue());

              if (this.isEditingMode == true) {
                  this.userService.updateUser(user).subscribe((data) => {
                      this.router.navigateByUrl("/profile/myprofile");
                  });
              } else {
                  this.userService.createUser(user).subscribe((data) => {
                      this.userService.createUserGroup(data.Data.Id, user).subscribe((data) => {
                          this.router.navigateByUrl("/profile/myprofile");
                      });
                  });
              }
              break;
          }
      }
  }

  delete() {
      this.userService.deleteUser(this.selectedUser.Id).subscribe((data) => {
          this.dialog.closeAll();
          this.router.navigateByUrl("/profile/myprofile");
      });
  }
}