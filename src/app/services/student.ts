import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Students } from '../components/students/students';

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
export class StudentService {
  private apiUrl = 'https://localhost:7252/api/Student';

  constructor(private http: HttpClient) {}

  // ✅ Get All
  getInstructors(): Observable<Students[]> {
    return this.http.get<Students[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Add Instructor
  addInstructor(data: Students): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
