import { Component, OnInit } from '@angular/core';
import { PhysicalTrainingRequest } from 'src/app/models/physical-training-request.model';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserviewappliedrequestComponent implements OnInit {

    trainings: PhysicalTrainingRequest[] = [];
    filteredTrainings: PhysicalTrainingRequest[] = [];
    searchQuery: string = '';
    deleteId: number | null = null;
    isDialogOpen : boolean = false;
    selectedTrainingRequest : PhysicalTrainingRequest | null = null;
    page : number = 1;

    userId: number = 0;
 
    constructor(private trainingService: PhysicalTrainingService) {}
 
    ngOnInit(): void {
      const storedUser = localStorage.getItem('currentUser');
      const user = JSON.parse(storedUser);
      this.userId = user?.UserId;
      this.getTrainings();
    }
 
    getTrainings(): void {
      this.trainingService.getPhysicalTrainingRequestsByUserId(this.userId).subscribe((data) => {
        console.log(data);
        this.trainings = data;
        this.filteredTrainings = data;
      });
    }
 
    searchTrainings(): void {
      if (this.searchQuery.trim() === ''){
        this.filteredTrainings = this.trainings;
      } else {
        this.filteredTrainings = this.trainings.filter(training => training.PhysicalTraining.TrainerName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }

    openDialog(trainingRequest : PhysicalTrainingRequest) {
      this.selectedTrainingRequest = trainingRequest
      console.log(this.selectedTrainingRequest);
      this.isDialogOpen = true;
    }

    closeDialog() {
      this.isDialogOpen = false;
      this.selectedTrainingRequest = null;
    }
  
    confirmDelete():void{
      this.trainingService.deletePhysicalTrainingRequest(this.selectedTrainingRequest.PhysicalTrainingRequestId).subscribe(() => {
        this.getTrainings();
        this.closeDialog();
      })
    }

    pageChanged(event: number): void {
      this.page = event;
    }
}
