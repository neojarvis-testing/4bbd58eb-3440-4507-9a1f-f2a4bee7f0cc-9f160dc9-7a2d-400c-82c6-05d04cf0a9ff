import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhysicalTraining } from '../models/physical-training.model';
import { PhysicalTrainingRequest } from '../models/physical-training-request.model';

@Injectable({
  providedIn: 'root'
})
export class PhysicalTrainingService {
  private baseTrainingUrl = 'https://8080-afeeedcfbfbfcbfefbafcfdcadccdcfaff.premiumproject.examly.io/api/physicalTraining';
  private baseRequestUrl = 'https://8080-afeeedcfbfbfcbfefbafcfdcadccdcfaff.premiumproject.examly.io/api/physical-training-request';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all physical training sessions
  getAllPhysicalTrainings(): Observable<PhysicalTraining[]> {
    return this.http.get<PhysicalTraining[]>(this.baseTrainingUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Retrieve a specific physical training session by its ID
  getPhysicalTrainingById(trainingId: number): Observable<PhysicalTraining> {
    return this.http.get<PhysicalTraining>(`${this.baseTrainingUrl}/${trainingId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Add a new physical training session
  addPhysicalTraining(training: PhysicalTraining): Observable<PhysicalTraining> {
    return this.http.post<PhysicalTraining>(this.baseTrainingUrl, training, {
      headers: this.getAuthHeaders()
    });
  }

  // Update an existing physical training session
  updatePhysicalTraining(trainingId: number, training: PhysicalTraining): Observable<PhysicalTraining> {
    return this.http.put<PhysicalTraining>(`${this.baseTrainingUrl}/${trainingId}`,training,{ headers: this.getAuthHeaders() }
    );
  }

  // Delete a physical training session by its ID
  deletePhysicalTraining(trainingId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseTrainingUrl}/${trainingId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Fetch all physical training requests
  getAllPhysicalTrainingRequests(): Observable<PhysicalTrainingRequest[]> {
    return this.http.get<PhysicalTrainingRequest[]>(this.baseRequestUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Retrieve all physical training requests by a specific user ID
  getPhysicalTrainingRequestsByUserId(
    userId: number
  ): Observable<PhysicalTrainingRequest[]> {
    return this.http.get<PhysicalTrainingRequest[]>(
      `${this.baseRequestUrl}/user/${userId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // Submit a new physical training request
  addPhysicalTrainingRequest(
    request: PhysicalTrainingRequest
  ): Observable<PhysicalTrainingRequest> {
    return this.http.post<PhysicalTrainingRequest>(this.baseRequestUrl, request, {
      headers: this.getAuthHeaders()
    });
  }

  // Update an existing physical training request
  updatePhysicalTrainingRequest(
    requestId: number,
    request: PhysicalTrainingRequest
  ): Observable<PhysicalTrainingRequest> {
    return this.http.put<PhysicalTrainingRequest>(
      `${this.baseRequestUrl}/${requestId}`,
      request,
      { headers: this.getAuthHeaders() }
    );
  }

  // Delete a physical training request by its ID
  deletePhysicalTrainingRequest(requestId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseRequestUrl}/${requestId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
