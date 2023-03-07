import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { FormComponent as GroupForm } from './groups/form/form.component';
import { UsersComponent } from './users/users.component';
import { FormComponent as UserForm } from './users/form/form.component';
import { RolesComponent } from './roles/roles.component';
import { FormComponent as RoleForm } from './roles/form/form.component';
import { FlowsComponent } from './flows/flows.component';
import { FormComponent as FlowForm } from './flows/form/form.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/add', component: UserForm },
  { path: 'users/view', component: UserForm },
  { path: 'groups', component: GroupsComponent },
  { path: 'groups/add', component: GroupForm },
  { path: 'groups/view', component: GroupForm },
  { path: 'roles', component: RolesComponent },
  { path: 'roles/add', component: RoleForm },
  { path: 'roles/view', component: RoleForm },
  { path: 'flows', component: FlowsComponent },
  { path: 'flows/add', component: FlowForm },
  { path: 'flows/view', component: FlowForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
