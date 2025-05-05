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
  filterByTrainingStatus : string = 'All';
  currentStatus : string = 'Pending'
  selectedTrainingRequest : PhysicalTrainingRequest | null = null;
  statusTracker: { [key: number]: { isApproved: boolean, isRejected: boolean } } = {};
  loading: boolean = true;
  page : number = 1

  constructor(private  trainingService : PhysicalTrainingService, private route : Router) { }

  ngOnInit(): void {
    this.loadAppliedTrainings();
  }

  loadAppliedTrainings() {
    this.loading = true;
    this.trainingService.getAllPhysicalTrainingRequests().subscribe((data) => {
      console.log(data)
      this.trainingRequests = data;
      this.tempTrainingRequests = data;
      this.populateStatusTracker();
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
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
  }
}

