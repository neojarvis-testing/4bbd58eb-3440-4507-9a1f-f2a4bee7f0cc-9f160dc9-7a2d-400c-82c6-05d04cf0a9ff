import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicalTrainingRequest } from 'src/app/models/physical-training-request.model';
import { PhysicalTraining } from 'src/app/models/physical-training.model';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-adminviewtraining',
  templateUrl: './adminviewtraining.component.html',
  styleUrls: ['./adminviewtraining.component.css']
})
export class AdminviewtrainingComponent implements OnInit {

  trainings: PhysicalTraining[] = [];
  appliedTrainings: PhysicalTrainingRequest[] = [];
  searchTerm: string = '';
  isDialogueOpen: boolean = false;
  selectedTraining: PhysicalTraining | null = null;
  errorMessage: string = '';
  loading: boolean = true;
  page : number = 1
 
 constructor(private trainingService: PhysicalTrainingService, private router: Router) { }
 
  ngOnInit(): void {
    this.loadTrainings();
    this.loadAppliedTrainings();
  }
 
  loadTrainings(): void {
    this.loading = true;
    this.trainingService.getAllPhysicalTrainings().subscribe((data) => {
      console.log(data);
      this.trainings = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }
 
  loadAppliedTrainings(): void {
    this.trainingService.getAllPhysicalTrainingRequests().subscribe((data) => {
      console.log(data);
      this.appliedTrainings = data;
    });
  }
 
  filteredTrainings(): PhysicalTraining[] {
    return this.trainings.filter(inv =>
      inv.TrainingName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
 
  editTraining(training: PhysicalTraining): void {
    this.router.navigate(['/adminedittraining', training.PhysicalTrainingId]);
  }
 
  openDialogue(training: PhysicalTraining): void {
    this.selectedTraining = training;
    this.isDialogueOpen = true;
    this.errorMessage = '';
    document.body.classList.add('dialog-open');
  }
 
  closeDialogue(): void {
    this.isDialogueOpen = false;
    this.selectedTraining = null;
    this.errorMessage = '';
    document.body.classList.remove('dialog-open');
  }
 
  deleteTraining(): void {
    if (this.selectedTraining) {
      const isApplied = this.appliedTrainings.some(app => app.PhysicalTrainingId === this.selectedTraining!.PhysicalTrainingId);
      if (isApplied) {
        this.errorMessage = 'Training cannot be deleted, it is referenced in Training Request';
      } else {
        this.trainingService.deletePhysicalTraining(this.selectedTraining.PhysicalTrainingId).subscribe(() => {
          this.loadTrainings();
          this.closeDialogue();
        });
      }
    }
  }

  pageChanged(event: number): void {
    this.page = event;
  }
}
