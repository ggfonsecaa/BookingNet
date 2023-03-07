import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlowModel } from 'src/app/models/flowModel';
import { UserModel } from 'src/app/models/userModel';
import { FlowsService } from 'src/app/services/flows.service';
import { HeaderService } from 'src/app/services/header.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

    validator: FormGroup = this.builder.group({
        'Id': [''],
        'Name': ['', [Validators.required, Validators.maxLength(30)]],
        'HasPreviousFlow': [false , [Validators.required]],
        'FlowId': [{ value: 'Seleccione una opción', disabled: true }],
        'UserId': ['Seleccione una opción']
    })

    get hasPreviousFlowControl() {
        return this.validator.controls['HasPreviousFlow'];
    }

    get previousFlowValue() {
        return this.validator.controls['FlowId'];
    }

    isEditingMode!: boolean;
    isLoading!: boolean;
    listFlows: FlowModel[] = [];
    listUsers: UserModel[] = [];
    selectedFlow!: FlowModel;

    private controlSubscription!: Subscription;
    private selectedFlowSubscription!: Subscription;
    private selectedFlowParentSubscription!: Subscription;
    private usersSubscription!: Subscription;

    constructor(private flowService: FlowsService,
        private userService: UsersService,
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
        this.headerService.show('flows');

        this.controlSubscription = this.hasPreviousFlowControl.valueChanges.subscribe((value) => {
            value ? this.previousFlowValue.enable() : this.previousFlowValue.disable();
        })

        this.selectedFlowParentSubscription = this.flowService.getAllFlows().subscribe((data) => {
            this.listFlows = data.Data;
        });

        this.usersSubscription = this.userService.getAllUsers().subscribe((data) => {
            this.listUsers = data.Data;
        });

        if (this.activatedRoute.snapshot.url[1].path == 'view') {
            this.isEditingMode = true;
            this.edit();
        } else {
            this.isEditingMode = false;
        }
    }

    ngOnDestroy(): void {
        if (this.selectedFlowSubscription) {
            this.selectedFlowSubscription.unsubscribe();
        }

        if (this.selectedFlowParentSubscription) {
            this.selectedFlowParentSubscription.unsubscribe();
        }
        
        if (this.usersSubscription) {
            this.usersSubscription.unsubscribe();
        }

        this.controlSubscription.unsubscribe();
        this.headerService.hide();
    }

    edit() {
        this.selectedFlowSubscription = this.flowService.selectedFlow$.subscribe((data) => {
            this.selectedFlow = data;
        });
        
        if (!this.selectedFlow.Id) {
            this.router.navigateByUrl("/flows");
        } else {
            this.validator.controls["Id"].setValue(this.selectedFlow.Id);
            this.validator.controls["Name"].setValue(this.selectedFlow.Name);
            this.validator.controls["HasPreviousFlow"].setValue(this.selectedFlow.HasPreviousFlow);
            this.validator.controls["FlowId"].setValue(this.selectedFlow.FlowId);
            this.validator.controls["UserId"].setValue(this.selectedFlow.UserId);
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
                let flow = Object.assign(new FlowModel, this.validator.getRawValue());

                if (this.isEditingMode == true) {
                    this.flowService.updateFlow(flow).subscribe((data) => {
                        this.router.navigateByUrl("/flows");
                    });
                } else {
                    this.flowService.createFlow(flow).subscribe((data) => {
                        this.router.navigateByUrl("/flows");
                    });
                }
                break;
            }
        }
    }

    delete() {
        this.flowService.deleteFlow(this.selectedFlow.Id).subscribe((data) => {
            this.dialog.closeAll();
            this.router.navigateByUrl("/flows");
        });
    }
}