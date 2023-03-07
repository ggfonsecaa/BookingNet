import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupModel } from 'src/app/models/groupModel';
import { RoleModel } from 'src/app/models/roleModel';
import { GroupsService } from 'src/app/services/groups.service';
import { HeaderService } from 'src/app/services/header.service';
import { RolesService } from 'src/app/services/roles.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  validator: FormGroup = this.builder.group({
    'Id': [''],
    'Name': ['', [Validators.required, Validators.maxLength(30)]],
    'RoleId': ['Seleccione una opción' , [Validators.required]]
  })

  isEditingMode!: boolean;
  isLoading!: boolean;
  
  listRoles: RoleModel[] = [];
  selectedGroup!: GroupModel;
  private selectedGroupSubscription!: Subscription;
  private selectedRoleSubscription!: Subscription;

  constructor(private groupService: GroupsService,
      private roleService: RolesService, 
      private builder: FormBuilder, 
      private router: Router, 
      private spinnerService: SpinnerService, 
      private activatedRoute: ActivatedRoute,
      private headerService: HeaderService,
      private dialog: MatDialog) 
  {
      this.spinnerService.isLoading$.subscribe((data) => {
          this.isLoading = data.valueOf();
      });
  }

  ngOnInit(): void {
      this.headerService.show('groups');

      this.selectedRoleSubscription = this.roleService.getAllRoles().subscribe((data) => {
        this.listRoles = data.Data;
      });

      if (this.activatedRoute.snapshot.url[1].path == 'view') {
          this.isEditingMode = true;
          this.edit();
      } else {
          this.isEditingMode = false;
      }
  }

  ngOnDestroy(): void {
      if (this.selectedGroupSubscription) {
          this.selectedGroupSubscription.unsubscribe();
      }

      if (this.selectedRoleSubscription) {
          this.selectedRoleSubscription.unsubscribe();
      }

      this.headerService.hide();
  }

  edit() {
      this.selectedGroupSubscription = this.groupService.selectedGroup$.subscribe((data) => {
          this.selectedGroup = data;
      });
      
      if (!this.selectedGroup.Id) {
          this.router.navigateByUrl("/groups");
      } else {
          this.validator.controls["Id"].setValue(this.selectedGroup.Id);
          this.validator.controls["Name"].setValue(this.selectedGroup.Name);
          this.validator.controls["RoleId"].setValue(this.selectedGroup?.Role?.Id);
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
              let group = Object.assign(new GroupModel, this.validator.getRawValue());

              if (this.isEditingMode == true) {
                  this.groupService.updateGroup(group).subscribe((data) => {
                      this.router.navigateByUrl("/groups");
                  });
              } else {
                  this.groupService.createGroup(group).subscribe((data) => {
                      this.router.navigateByUrl("/groups");
                  });
              }
              break;
          }
      }
  }

  delete() {
      this.groupService.deleteGroup(this.selectedGroup.Id).subscribe((data) => {
          this.dialog.closeAll();
          this.router.navigateByUrl("/groups");
      });
  }
}