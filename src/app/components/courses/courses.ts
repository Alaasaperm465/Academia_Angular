import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Course, CourseService } from '../../services/course';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './courses.html'
})
export class Courses implements OnInit, OnDestroy {

  courses: Course[] = [];
  loading = true;
  error = '';
  dataResponse!: Subscription;
  showLayout = false;

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataResponse = this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
        this.cdr.detectChanges(); // تحديث الـ UI بعد تحميل البيانات
      },
      error: (err) => {
        console.error(err);
        this.error = 'خطأ في تحميل الكورسات';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.dataResponse.unsubscribe();
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.id !== id);
          this.cdr.detectChanges(); // تحديث الـ UI بعد الحذف
        },
        error: (err) => console.error(err)
      });
    }
  }
}
