<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'https://8080-afeeedcfbfbfcbfefbafcfdcadccdcfaff.premiumproject.examly.io/api/feedback';

  constructor(private http: HttpClient) {}

  // Helper method to retrieve Authorization headers with JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Send feedback to the server
  sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.baseUrl, feedback, {
      headers: this.getAuthHeaders()
    });
  }

  // Retrieve all feedbacks by a specific user ID
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete feedback by ID
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${feedbackId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Fetch all feedbacks
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }
}
=======
>>>>>>> 6c4b9d6d03fe718c058d69e9f3b8263c62015b83
