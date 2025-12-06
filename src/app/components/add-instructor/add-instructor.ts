import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InstructorService, Instructor } from '../../services/instructor';

@Component({
  selector: 'app-add-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-instructor.html'
})
export class AddInstructor {

  instructor: Instructor = {
    name: '',
    email: '',
    specialty: ''
  };

  loading = false;
  error = '';

  constructor(
    private instructorService: InstructorService,
    private router: Router
  ) {}

  submit() {
    this.loading = true;

    this.instructorService.addInstructor(this.instructor).subscribe({
      next: () => {
        alert('Instructor Added Successfully ✅');
        this.router.navigate(['/instructors']);
      },
      error: (err) => {
        this.error = 'حصل خطأ أثناء الإضافة';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
