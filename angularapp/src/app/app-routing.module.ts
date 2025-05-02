import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { AdminaddtrainingComponent } from './components/adminaddtraining/adminaddtraining.component';
import { AdminviewtrainingComponent } from './components/adminviewtraining/adminviewtraining.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewtrainingComponent } from './components/userviewtraining/userviewtraining.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminedittrainingComponent } from './components/adminedittraining/adminedittraining.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'add-training', component: AdminaddtrainingComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'view-trainings', component: AdminviewtrainingComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'trainings-requested', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'adminedittraining/:id', component: AdminedittrainingComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'view-feedbacks', component: AdminviewfeedbackComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'viewalltrainings', component: UserviewtrainingComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'applytraining/:id', component: UseraddrequestComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'appliedtrainings', component: UserviewappliedrequestComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'postfeedback/:id', component: UseraddfeedbackComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'myfeedbacks', component: UserviewfeedbackComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'error', component: ErrorComponent, data: { message: 'Something went wrong.' } },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
