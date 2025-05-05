import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicalTraining } from 'src/app/models/physical-training.model';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-adminedittraining',
  templateUrl: './adminedittraining.component.html',
  styleUrls: ['./adminedittraining.component.css']
})
export class AdminedittrainingComponent implements OnInit {

  training: PhysicalTraining = {
    TrainingName: '',
    Description: '',
    TrainerName: '',
    Location: '',
    IsIndoor: true,
    Fee: 0,
    FocusArea: '',
    PhysicalRequirements: ''
  }

  trainings: PhysicalTraining[] = [];
  trainingId: number;
  isDialogOpen: boolean = false;
  formSubmitted: boolean = false;

  constructor(private trainingService: PhysicalTrainingService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.trainingId = +params['id']
      this.trainingService.getPhysicalTrainingById(this.trainingId).subscribe((data) => {
        this.training = data;
        console.log(this.training);
      });
    })
    this.loadTrainings();
  }

  loadTrainings() {
    this.trainingService.getAllPhysicalTrainings().subscribe((data) => {
      this.trainings = data;
      console.log(this.trainings);
    })
  }

  updateTraining(form: NgForm): void {
    this.formSubmitted = true;

    if (!form.valid) {
      return;
    }

    this.trainingService.updatePhysicalTraining(this.trainingId, this.training).subscribe(() => {
      this.openDialog();
    }, error => {
      console.error('Error updating investment', error);
    });
  }

  // IsFormValid(): boolean {
  //   if (this.training.TrainerName &&
  //     this.training.Description &&
  //     this.training.TrainerName &&
  //     this.training.Location &&
  //     this.training.Fee &&
  //     this.training.FocusArea &&
  //     this.training.PhysicalRequirements) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

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
