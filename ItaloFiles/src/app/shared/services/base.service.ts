import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export class BaseService<T> {
  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/resources';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  // GET All
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // POST
  create(item: T): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // PUT
  update(id: any, item: T): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // DELETE
  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Error handler
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server error (${error.status}):`, error.error);
    }
    return throwError(() => new Error('Request failed; please try again later.'));
  }
}

