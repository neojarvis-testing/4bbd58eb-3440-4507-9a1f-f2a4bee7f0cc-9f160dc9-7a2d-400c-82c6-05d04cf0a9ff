import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicalTrainingRequest } from 'src/app/models/physical-training-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UserAddRequestComponent implements OnInit {
 

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9ecb8e18ce53a9260bed8b937339c93d6a0fc4f1
  trainingRequest: PhysicalTrainingRequest = {
    UserId: 0,
    PhysicalTrainingId: 0,
    RequestDate: new Date().toISOString(),
    Status: 'Pending',
    HealthConditions: '',
    FitnessGoals: '',
    Comments: ''
  }

  isDialogOpen : boolean = false;
  formSubmitted: boolean = false;

  constructor(private router: Router, private trainingService: PhysicalTrainingService, private activatedRoute : ActivatedRoute, private authService : AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.trainingRequest.PhysicalTrainingId = +params['id']

      const storedUser = localStorage.getItem('currentUser');
      const user = JSON.parse(storedUser);
      this.trainingRequest.UserId = user.UserId;
    })
<<<<<<< HEAD
  }

  applyForTraining() {
    this.formSubmitted = true;
    console.log(this.trainingRequest);
    if(this.isFormValid()) {
      this.trainingService.addPhysicalTrainingRequest(this.trainingRequest).subscribe(() => {
        this.openDialog();
      })
    }
  }

  isFormValid(): boolean {
    if(this.trainingRequest.UserId && 
      this.trainingRequest.PhysicalTrainingId && 
      this.trainingRequest.RequestDate && 
      this.trainingRequest.Status && 
      this.trainingRequest.HealthConditions && 
      this.trainingRequest.FitnessGoals){
      return true;
    }
    else{
      return false;
    }
  }

=======
  }

  applyForTraining() {
    this.formSubmitted = true;
    console.log(this.trainingRequest);
    if(this.isFormValid()) {
      this.trainingService.addPhysicalTrainingRequest(this.trainingRequest).subscribe(() => {
        this.openDialog();
      })
    }
  }

  isFormValid(): boolean {
    if(this.trainingRequest.UserId && 
      this.trainingRequest.PhysicalTrainingId && 
      this.trainingRequest.RequestDate && 
      this.trainingRequest.Status && 
      this.trainingRequest.HealthConditions && 
      this.trainingRequest.FitnessGoals){
      return true;
    }
    else{
      return false;
    }
  }

>>>>>>> 9ecb8e18ce53a9260bed8b937339c93d6a0fc4f1
  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.router.navigate(['/viewalltrainings']);
  }
<<<<<<< HEAD
}




=======
}
=======
  constructor(
   
  ) {}

  ngOnInit(): void {
    
  }

 

}
>>>>>>> 6c4b9d6d03fe718c058d69e9f3b8263c62015b83
>>>>>>> 9ecb8e18ce53a9260bed8b937339c93d6a0fc4f1
