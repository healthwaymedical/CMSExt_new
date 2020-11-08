import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptorService} from './services/token-interceptor.service';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';

import { ModalModule} from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from './services/auth-service.service';
import { AuthGuard } from './guards/auth.guard';
import { AppointmentNewComponent } from './views/appointment-new/appointment-new.component';
import { ErrorsComponent } from './views/errors/errors.component';
import { UtilsService } from './services/utils.service';
import { AppointmentEditComponent } from './views/appointment-edit/appointment-edit.component';
import { AppointmentViewComponent } from './views/appointment-view/appointment-view.component';


import { CommonModule } from '@angular/common';

// import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    CommonModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
    

  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,

    LoginComponent,

    AppointmentNewComponent,

    ErrorsComponent,

    AppointmentEditComponent
  ],
  entryComponents: [
    AppointmentNewComponent,
    AppointmentEditComponent,
    
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, AuthServiceService, AuthGuard,UtilsService,
{
  provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptorService,
  multi:true
},
],
  bootstrap: [ AppComponent, ]
})
export class AppModule { }
