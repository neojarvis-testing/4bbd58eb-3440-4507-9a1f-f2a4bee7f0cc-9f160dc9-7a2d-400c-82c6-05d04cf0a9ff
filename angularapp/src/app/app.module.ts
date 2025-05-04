import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminaddtrainingComponent } from './components/adminaddtraining/adminaddtraining.component';
import { AdminedittrainingComponent } from './components/adminedittraining/adminedittraining.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewtrainingComponent } from './components/adminviewtraining/adminviewtraining.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewtrainingComponent } from './components/userviewtraining/userviewtraining.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    AdminaddtrainingComponent,
    AdminedittrainingComponent,
    AdminnavComponent,
    AdminviewappliedrequestComponent,
    AdminviewfeedbackComponent,
    AdminviewtrainingComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    UseraddfeedbackComponent,
    UseraddrequestComponent,
    UsernavComponent,
    UserviewappliedrequestComponent,
    UserviewfeedbackComponent,
    UserviewtrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
