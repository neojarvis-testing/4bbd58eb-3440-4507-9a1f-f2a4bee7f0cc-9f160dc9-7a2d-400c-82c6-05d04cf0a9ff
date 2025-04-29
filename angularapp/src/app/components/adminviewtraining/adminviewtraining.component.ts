import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminviewtraining',
  templateUrl: './adminviewtraining.component.html',
  styleUrls: ['./adminviewtraining.component.css']
})
export class AdminviewtrainingComponent implements OnInit {
  trainingSessions: { name: string, details: string }[] = []; // Sample data for training sessions
  searchQuery: string = ''; // Search query for filtering
  selectedTraining: any = null; // Training to delete
  showDeleteConfirm: boolean = false; // Controls delete confirmation popup

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch training sessions from backend (replace with API call)
    this.trainingSessions = [
      { name: 'Yoga Basics', details: 'Beginner yoga course' },
      { name: 'HIIT Pro', details: 'High-intensity interval training' }
    ];
  }

  // Navigate to edit training
  editTraining(training: any): void {
    this.router.navigate(['/adminedittraining'], { state: { training } });
  }

  // Confirm deletion
  confirmDelete(training: any): void {
    this.selectedTraining = training;
    this.showDeleteConfirm = true;
  }

  // Delete training record
  deleteTraining(): void {
    this.trainingSessions = this.trainingSessions.filter(t => t !== this.selectedTraining);
    this.selectedTraining = null;
    this.showDeleteConfirm = false;
    alert('Training deleted successfully!');
  }

  // Cancel deletion
  cancelDelete(): void {
    this.selectedTraining = null;
    this.showDeleteConfirm = false;
  }

  // Filter training sessions based on search query
  getFilteredTrainings(): any[] {
    return this.trainingSessions.filter(session =>
      session.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
