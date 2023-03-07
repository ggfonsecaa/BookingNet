import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleModel } from 'src/app/models/roleModel';
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
    'Name': ['', [Validators.required, Validators.maxLength(30)]]
  })

  isEditingMode!: boolean;
  isLoading!: boolean;
  displayedColumns: string[] = ['Id', 'Name'];
  
  selectedRole!: RoleModel;
  private selectedRoleSubscription!: Subscription;

  constructor(private roleService: RolesService, 
      private builder: FormBuilder, 
      private router: Router, 
      private activatedRoute: ActivatedRoute,
      private headerService: HeaderService,
      private dialog: MatDialog) 
  {

  }

  ngOnInit(): void {
      this.headerService.show('roles');

      if (this.activatedRoute.snapshot.url[1].path == 'view') {
          this.isEditingMode = true;
          this.edit();
      } else {
          this.isEditingMode = false;
      }
  }

  ngOnDestroy(): void {
      if (this.selectedRoleSubscription) {
          this.selectedRoleSubscription.unsubscribe();
      }
      this.headerService.hide();
  }

  edit() {
      this.selectedRoleSubscription = this.roleService.selectedRole$.subscribe((data) => {
          this.selectedRole = data;
      });

      
      if (!this.selectedRole.Id) {
          this.router.navigateByUrl("/roles");
      } else {
          // this.validator.controls["id"].setValue(this.selectedUser.id);
          // this.validator.controls["userName"].setValue(this.selectedUser.userName);
          // this.validator.controls["userEmail"].setValue(this.selectedUser.userEmail);
  
          this.validator.setValue(this.selectedRole);
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
              let role = Object.assign(new RoleModel, this.validator.getRawValue());

              if (this.isEditingMode == true) {
                  this.roleService.updateRole(role).subscribe((data) => {
                      this.router.navigateByUrl("/roles");
                  });
              } else {
                  this.roleService.createRole(role).subscribe((data) => {
                      this.router.navigateByUrl("/roles");
                  });
              }
              break;
          }
      }
  }

  delete() {
      this.roleService.deleteRole(this.selectedRole.Id).subscribe((data) => {
          this.dialog.closeAll();
          this.router.navigateByUrl("/roles");
      });
  }
}