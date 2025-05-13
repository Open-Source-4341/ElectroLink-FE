import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../entity/review.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  getByTechnician(technicianId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}?technicianId=${technicianId}`);
  }

  create(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  update(id: number, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${id}`, review);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
