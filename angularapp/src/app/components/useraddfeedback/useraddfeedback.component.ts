

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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977
  newFeedback : Feedback = {
    FeedbackId : 0,
    UserId : 0,
    FeedbackText : '',
    Date : new Date()
  }

  isUserDialogOpen : boolean = false
  formSubmitted : boolean = false

  constructor(private feedbackService : FeedbackService, private activatedRouter : ActivatedRoute, private router: Router) { }
<<<<<<< HEAD
=======
=======
  newFeedback: Feedback = {
    FeedbackId: 0,
    UserId: 0,
    FeedbackText: '',
    Date: new Date()
  }

  isUserDialogOpen: boolean = false
  formSubmitted: boolean = false

  constructor(private feedbackService: FeedbackService, private activatedRouter: ActivatedRoute, private router: Router) { }
>>>>>>> 9ecb8e18ce53a9260bed8b937339c93d6a0fc4f1
>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.newFeedback.UserId = +params['id']
      console.log(this.newFeedback.UserId);
    })
  }

  addFeedback() {
    this.formSubmitted = true;
<<<<<<< HEAD
    if(this.isFormValid()) {
=======
<<<<<<< HEAD
    if(this.isFormValid()) {
=======
    if (this.isFormValid()) {
>>>>>>> 9ecb8e18ce53a9260bed8b937339c93d6a0fc4f1
>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977
      this.feedbackService.sendFeedback(this.newFeedback).subscribe(() => {
      })
      this.openDialog();
    }
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977
  isFormValid(): boolean{
    if(this.newFeedback.FeedbackText){
      return true;
    }
    else{
      return false;
    }
<<<<<<< HEAD
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
=======
=======
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
>>>>>>> 9ecb8e18ce53a9260bed8b937339c93d6a0fc4f1
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
>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977

}


<<<<<<< HEAD



=======
<<<<<<< HEAD




=======
>>>>>>> 9ecb8e18ce53a9260bed8b937339c93d6a0fc4f1
>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977
