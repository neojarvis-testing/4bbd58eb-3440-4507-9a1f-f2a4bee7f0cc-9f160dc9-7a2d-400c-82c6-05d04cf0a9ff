<<<<<<< HEAD
=======

>>>>>>> f676c4cbf7e504b1c98afb9fd928cabae364b8b0
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PhysicalTraining } from 'src/app/models/physical-training.model';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-adminaddtraining',
  templateUrl: './adminaddtraining.component.html',
  styleUrls: ['./adminaddtraining.component.css']
})
export class AdminaddtrainingComponent implements OnInit {

  newTraining : PhysicalTraining = {
    TrainingName: '',
    Description: '',
    TrainerName: '',
    Location: '',
    IsIndoor: true,
    Fee: 0,
    FocusArea: '',
    PhysicalRequirements: ''
  }
  formSubmitted: boolean = false;
  trainings : PhysicalTraining[] = []
  isTrainingExist : boolean = false;
  isDialogOpen : boolean = false;
  
  constructor(private trainingService : PhysicalTrainingService, private router: Router) { }
 
 
  ngOnInit(): void {
     this.loadTrainings();
  }
 
  loadTrainings() {
    this.trainingService.getAllPhysicalTrainings().subscribe((data) => {
      this.trainings = data;
      console.log(this.trainings);
    })
  }
 
  addTraining() {
    this.formSubmitted = true;
    console.log(`${this.formSubmitted} formsub`);
    const isUnique = this.trainings.every(i => i.TrainingName.toLowerCase() != this.newTraining.TrainingName.toLowerCase())
    console.log(isUnique);
    
    if(isUnique) {
      if(this.IsFormValid()) {
        this.trainingService.addPhysicalTraining(this.newTraining).subscribe(() => {
          this.resetForm();
        })
        this.openDialog();
      }
    } else {
      this.isTrainingExist = true;
    }
  }

  IsFormValid(): boolean{
    if(this.newTraining.TrainerName &&  
      this.newTraining.Description && 
      this.newTraining.TrainerName && 
      this.newTraining.Location && 
      this.newTraining.Fee && 
      this.newTraining.FocusArea && 
      this.newTraining.PhysicalRequirements){
        return true;
    }
    else{
      return false;
    }
  }

  resetForm(): void{
    this.formSubmitted = false;
    this.newTraining = {
      TrainingName: '',
      Description: '',
      TrainerName: '',
      Location: '',
      IsIndoor: true,
      Fee: 0,
      FocusArea: '',
      PhysicalRequirements: ''
    }
  }


  openDialog() {
    this.isDialogOpen = true;
    document.body.classList.add('dialog-open');
  }
 
  closeDialog(): void {
    this.isDialogOpen = false;
    document.body.classList.remove('dialog-open');
    this.router.navigate(['/view-trainings']);
  }
}


