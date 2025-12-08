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
  instructors: Instructor[] = []; // ✅ نخزن الداتا هنا

  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => err))
    );
  }

  loadInstructors() {
    this.getInstructors().subscribe(data => {
      this.instructors = data;
    });
  }

  getInstructorNameById(id: number): string {
  const instructor = this.instructors.find(i => Number(i.id) === Number(id));
  return instructor ? instructor.name : 'غير معروف';
}


  addInstructor(data: Instructor): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
