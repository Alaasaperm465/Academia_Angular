import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CourseService, Course } from '../../services/course';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-course.html'
})
export class AddCourse {

  course: Course = {
    title: '',
    description: '',
    duration: 0,
    instructorId: 0
  };

  loading = false;
  error = '';

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  submit() {
    this.loading = true;

    this.courseService.addCourse(this.course).subscribe({
      next: () => {
        alert('Course Added Successfully ✅');
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'حصل خطأ أثناء إضافة الكورس';
        this.loading = false;
      }
    });
  }
}
