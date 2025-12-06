// src/app/instructors/instructors.component.ts
import { Component, OnInit } from '@angular/core';
import { Instructor, InstructorService } from '../../services/instructor';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-instructors',
  standalone: true, 
  imports: [CommonModule,RouterLink, RouterLinkActive,HttpClientModule],
  templateUrl: './instructors.html',
  styleUrl: './instructors.css',
})
export class Instructors implements OnInit {
  instructors: Instructor[] = [];
  loading = true;
  error: string | null = null;

  constructor(private _instructorService: InstructorService) {}

  ngOnInit(): void {
    this._instructorService.getInstructors().subscribe({
      next: (data) => {
        this.instructors = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'حدث خطأ أثناء تحميل البيانات';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
