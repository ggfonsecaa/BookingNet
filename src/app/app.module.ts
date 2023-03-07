import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerModule } from './components/drawer/drawer.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { ServicesModule } from './modules/services/services.module';
import { DatePipe } from '@angular/common';
import { ConsultsModule } from './modules/consults/consults.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SecurityModule } from './modules/security/security.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DrawerModule,
    ConfigurationModule,
    ServicesModule,
    ConsultsModule,
    CommunicationModule,
    InventoryModule,
    ProfileModule,
    SecurityModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
