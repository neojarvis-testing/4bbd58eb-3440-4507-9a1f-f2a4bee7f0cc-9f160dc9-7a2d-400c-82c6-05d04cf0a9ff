import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicalTrainingRequest } from 'src/app/models/physical-training-request.model';
import { PhysicalTraining } from 'src/app/models/physical-training.model';
import { AuthService } from 'src/app/services/auth.service';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-userviewtraining',
  templateUrl: './userviewtraining.component.html',
  styleUrls: ['./userviewtraining.component.css']
})
export class UserviewtrainingComponent implements OnInit {

    trainings: any;
    filteredTrainings: PhysicalTraining[] = [];
    searchQuery: string = '';
    appliedTrainings: number[] = [];
    page : number = 1;

    userId: number = 0; // Replace with the actual user ID
 
    constructor(private trainingService: PhysicalTrainingService, private router : Router, private as : AuthService) {}
 
    ngOnInit(): void {
      this.getTrainings();
      const storedUser = localStorage.getItem('currentUser');
      const user = JSON.parse(storedUser);
      console.log(user);
      console.log(user?.UserId);
      this.userId = user?.UserId;
    }

    getTrainings(): void {
      this.trainingService.getAllPhysicalTrainings().subscribe((data) => {
        this.trainings = data;
        this.filteredTrainings = data;
        this.getUserAppliedTrainings();
      });
    }
 
    getUserAppliedTrainings(): void {
      this.trainingService.getAllPhysicalTrainingRequests().subscribe((data: PhysicalTrainingRequest[]) => {
        console.log(data);
        console.log(this.userId);
        
        this.appliedTrainings = data
          .filter(app => app.UserId === this.userId)
          .map(app => app.PhysicalTrainingId);
      });
    }
 
    searchTrainings(): void {
      if (this.searchQuery.trim() === '') {
        this.filteredTrainings = this.trainings;
      } else {
        this.filteredTrainings = this.trainings.filter(training =>
          training.TrainingName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          training.Description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          training.FocusArea.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }

    isApplied(investmentId: number): boolean {
      console.log(this.appliedTrainings);
      return this.appliedTrainings.includes(investmentId);
    }
}
