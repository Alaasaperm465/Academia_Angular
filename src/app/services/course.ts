import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface Course {
  id?: number;
  title: string;
  description: string;
  duration: number;
  instructorId: number;
  instructor?: any;
  students?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'https://localhost:7252/api/Course'; // عدّل لو مختلف

  constructor(private http: HttpClient) {}

  //  Get All
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // Add Course
  addCourse(course: Course): Observable<any> {
    return this.http.post(this.apiUrl, course).pipe(
      catchError(err => throwError(() => err))
    );
  }
  // Get Course By Id (Details)
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // Update Course
  updateCourse(id: number, course: Course): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // Delete Course
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

}
