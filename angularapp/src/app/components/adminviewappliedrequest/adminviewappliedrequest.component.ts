import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicalTrainingRequest } from 'src/app/models/physical-training-request.model';
import { PhysicalTrainingService } from 'src/app/services/physical-training.service';

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {

  trainingRequests : PhysicalTrainingRequest[] = []
  tempTrainingRequests : PhysicalTrainingRequest[] = []
  searchByTrainingName : string = '';
  filterByTrainingStatus : string = '';
  currentStatus : string = 'Pending'
  selectedTrainingRequest : PhysicalTrainingRequest | null = null;
  statusTracker: { [key: number]: { isApproved: boolean, isRejected: boolean } } = {};
  page : number = 1

  constructor(private  trainingService : PhysicalTrainingService, private route : Router) { }

  ngOnInit(): void {
    this.loadAppliedTrainings();
  }

  loadAppliedTrainings() {
    this.trainingService.getAllPhysicalTrainingRequests().subscribe((data) => {
      console.log(data)
      this.trainingRequests = data;
      this.tempTrainingRequests = data;
      this.populateStatusTracker();
    })
  }

  populateStatusTracker() {
    this.trainingRequests.forEach(app => {
      this.statusTracker[app.PhysicalTrainingId] = { isApproved: false, isRejected: false };
    });
  }

  filterByTrainingName() {
    this.tempTrainingRequests = this.trainingRequests.filter(t => t.PhysicalTraining.TrainingName.toLowerCase().includes(this.searchByTrainingName.toLowerCase()))
  }

  filterByStatus() {
    if(this.filterByTrainingStatus === "All") {
      this.tempTrainingRequests = this.trainingRequests;
    } else {
      this.tempTrainingRequests = this.trainingRequests.filter(t => t.Status.toLowerCase().includes(this.filterByTrainingStatus.toLowerCase()))
    }
  }

  approveTraining(trainingRequest: PhysicalTrainingRequest) {
    trainingRequest.Status = "Approved";
    this.trainingService.updatePhysicalTrainingRequest(trainingRequest.PhysicalTrainingRequestId, trainingRequest).subscribe(() => {
      this.statusTracker[trainingRequest.PhysicalTrainingId].isApproved = true;
      this.statusTracker[trainingRequest.PhysicalTrainingId].isRejected = false;
    });
  }

  rejectTraining(trainingRequest: PhysicalTrainingRequest) {
    trainingRequest.Status = "Rejected";
    this.trainingService.updatePhysicalTrainingRequest(trainingRequest.PhysicalTrainingRequestId, trainingRequest).subscribe(() => {
      this.statusTracker[trainingRequest.PhysicalTrainingId].isRejected = true;
      this.statusTracker[trainingRequest.PhysicalTrainingId].isApproved = false;
    });
  }

  pageChanged(event: number): void {
    this.page = event;
      if(app.Status == "Approved"){
        this.statusTracker[app.PhysicalTrainingId] = { isApproved: true, isRejected: false };
      }
      else if(app.Status == "Rejected"){
        this.statusTracker[app.PhysicalTrainingId] = { isApproved: false, isRejected: true };
      }
      else{
        this.statusTracker[app.PhysicalTrainingId] = { isApproved: false, isRejected: false };
      }
    });
  }
user
  filterByTrainingName() {
    this.tempTrainingRequests = this.trainingRequests.filter(t => t.PhysicalTraining.TrainingName.toLowerCase().includes(this.searchByTrainingName.toLowerCase()))
  }

  filterByStatus() {
    if(this.filterByTrainingStatus === "All") {
      this.tempTrainingRequests = this.trainingRequests;
    } else {
      this.tempTrainingRequests = this.trainingRequests.filter(t => t.Status.toLowerCase().includes(this.filterByTrainingStatus.toLowerCase()))
    }
  }

  approveTraining(trainingRequest: PhysicalTrainingRequest) {
    trainingRequest.Status = "Approved";
    this.trainingService.updatePhysicalTrainingRequest(trainingRequest.PhysicalTrainingRequestId, trainingRequest).subscribe(() => {
      this.statusTracker[trainingRequest.PhysicalTrainingId].isApproved = true;
      this.statusTracker[trainingRequest.PhysicalTrainingId].isRejected = false;
    });
  }

  rejectTraining(trainingRequest: PhysicalTrainingRequest) {
    trainingRequest.Status = "Rejected";
    this.trainingService.updatePhysicalTrainingRequest(trainingRequest.PhysicalTrainingRequestId, trainingRequest).subscribe(() => {
      this.statusTracker[trainingRequest.PhysicalTrainingId].isRejected = true;
      this.statusTracker[trainingRequest.PhysicalTrainingId].isApproved = false;
    });
  }
}

