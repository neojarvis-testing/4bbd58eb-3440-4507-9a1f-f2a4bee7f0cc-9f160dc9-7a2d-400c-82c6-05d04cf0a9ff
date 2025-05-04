import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  newFeedback: Feedback = {
    FeedbackId: 0,
    UserId: 0,
    FeedbackText: '',
    Date: new Date()
  }

  isUserDialogOpen: boolean = false
  formSubmitted: boolean = false

  constructor(private feedbackService: FeedbackService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.newFeedback.UserId = +params['id']
      console.log(this.newFeedback.UserId);
    })
  }

  addFeedback() {
    this.formSubmitted = true;
    if (this.isFormValid()) {
      this.feedbackService.sendFeedback(this.newFeedback).subscribe(() => {
      })
      this.openDialog();
    }
  }

  isFormValid(): boolean {
    if (this.newFeedback.FeedbackText) {
      return true;
    }
    else {
      return false;
    }
  }

  openDialog() {
    this.isUserDialogOpen = true;
    document.body.classList.add('dialog-open');
  }

  closeDialog() {
    this.isUserDialogOpen = false;
    document.body.classList.remove('dialog-open');
    this.router.navigate(['/myfeedbacks']);
  }

}
