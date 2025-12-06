import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface Instructor {
  id?: number;
  name: string;
  email: string;
  specialty: string;
  courses?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = 'https://localhost:7252/api/Instructor';

  constructor(private http: HttpClient) {}

  // ✅ Get All
  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Add Instructor
  addInstructor(data: Instructor): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
