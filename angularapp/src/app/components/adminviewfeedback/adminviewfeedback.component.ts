// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-adminviewfeedback',
//   templateUrl: './adminviewfeedback.component.html',
//   styleUrls: ['./adminviewfeedback.component.css']
// })
// export class AdminviewfeedbackComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: { text: string; user: { name: string; email: string } }[] = []; // List of feedbacks
  selectedUserProfile: any = null; // Stores the profile for modal display
  showLogoutConfirm: boolean = false; // Controls the visibility of logout modal

  constructor() {}

  ngOnInit(): void {
    // Example feedbacks - replace with API call to fetch real data
    this.feedbacks = [
      { text: 'Great app!', user: { name: 'John Doe', email: 'john@example.com' } },
      { text: 'Needs improvement.', user: { name: 'Jane Smith', email: 'jane@example.com' } }
    ];
  }

  // Show user profile in modal
  showProfile(user: any): void {
    this.selectedUserProfile = user;
  }

  // Close the profile modal
  closeProfile(): void {
    this.selectedUserProfile = null;
  }

  // Show logout confirmation modal
  confirmLogout(): void {
    this.showLogoutConfirm = true;
  }

  // Perform logout and navigate to login component
  logout(): void {
    this.showLogoutConfirm = false;
    console.log('Navigating to login component...'); // Replace with actual navigation logic
  }

  // Cancel the logout action
  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }
}