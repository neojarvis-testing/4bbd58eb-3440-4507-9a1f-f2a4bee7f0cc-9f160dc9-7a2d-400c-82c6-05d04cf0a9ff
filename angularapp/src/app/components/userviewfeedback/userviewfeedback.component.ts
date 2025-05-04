import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

    feedbacks: Feedback[] = [];
    deleteId: number | null = null;
    isDialogOpen : boolean = false;
    selectedFeedback: Feedback | null = null;
    UserId : number = 0;
    loading: boolean = true;
    page : number = 1;
    
 
    constructor(private feedbackService: FeedbackService, private route: ActivatedRoute,private router:Router, private authService : AuthService) {}
 
    ngOnInit(): void {
      const storedUser = localStorage.getItem('currentUser');
      const user = JSON.parse(storedUser);
      this.UserId = user?.UserId;
      this.loadFeedbacks();
    }
 
    loadFeedbacks(): void {
      this.loading = true;
      this.feedbackService.getAllFeedbacksByUserId(this.UserId).subscribe((data) => {
        this.feedbacks = data;
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }

    openDialog(feedback : Feedback) {
      this.selectedFeedback = feedback
      console.log(this.selectedFeedback)
      this.isDialogOpen = true;
      document.body.classList.add('dialog-open');
    }

    closeDialog() {
      this.isDialogOpen = false;
      this.selectedFeedback = null;
      document.body.classList.remove('dialog-open');
    }
  
    confirmDelete():void{
      this.feedbackService.deleteFeedback(this.selectedFeedback.FeedbackId).subscribe(() => {
      },
      (error) => {
        console.log(error);
      });
      this.closeDialog();
      this.loadFeedbacks();
    }

    pageChanged(event: number): void {
      this.page = event;
    }
}
