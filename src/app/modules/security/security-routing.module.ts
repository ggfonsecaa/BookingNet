import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { SignoutComponent } from './signout/signout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
