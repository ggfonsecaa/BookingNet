import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './guards/session.guard';
import { CommunicationModule } from './modules/communication/communication.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { ConsultsModule } from './modules/consults/consults.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SecurityModule } from './modules/security/security.module';
import { ServicesModule } from './modules/services/services.module';

const routes: Routes = [ 
  { path: 'config', loadChildren: () => ConfigurationModule, canActivate: [SessionGuard]},
  { path: 'services', loadChildren: () => ServicesModule, canActivate: [SessionGuard] },
  { path: 'consults', loadChildren: () => ConsultsModule, canActivate: [SessionGuard] },
  { path: 'inventory', loadChildren: () => InventoryModule, canActivate: [SessionGuard] },
  { path: 'communication', loadChildren: () => CommunicationModule, canActivate: [SessionGuard] },
  { path: 'profile', loadChildren: () => ProfileModule, canActivate: [SessionGuard] },
  { path: 'auth', loadChildren: () => SecurityModule },
  // { path: '**', pathMatch: 'full', redirectTo: 'services/bookings'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
