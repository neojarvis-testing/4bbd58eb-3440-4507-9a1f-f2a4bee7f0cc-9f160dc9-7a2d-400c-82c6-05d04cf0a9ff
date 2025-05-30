import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks : Feedback[] = []
  selectedUser:any
  isProfileModalOpen:boolean=false;
  loading: boolean = true;
  page: number = 1;
 
  constructor(private feedbackService : FeedbackService) { }
 
  ngOnInit(): void {
     this.loadFeedbacks();
  }
 
  loadFeedbacks() {
    this.loading = true;
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }
 
  showProfile(user : any) {
    this.selectedUser=user;
    this.isProfileModalOpen=true;
  }
 
  closeProfileModal() {
    this.isProfileModalOpen=false;
    this.selectedUser=null;
  }

  pageChanged(event: number): void {
    this.page = event;
  }
}
