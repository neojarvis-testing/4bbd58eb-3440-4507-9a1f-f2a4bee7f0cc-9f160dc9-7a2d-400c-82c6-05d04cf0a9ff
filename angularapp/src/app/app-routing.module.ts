import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminviewtrainingComponent } from './components/adminviewtraining/adminviewtraining.component';
import { AdminviewfeedbackComponent } from './adminviewfeedback/adminviewfeedback.component';

const routes: Routes = [
  {path:"",component:AdminviewtrainingComponent},
  // {path:"",component:AdminviewfeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
