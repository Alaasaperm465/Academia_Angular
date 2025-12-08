import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CourseService, Course } from '../../services/course';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-course.html'
})
export class EditCourse implements OnInit {

  course!: Course;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(this.id).subscribe(res => {
      this.course = res;
      this.cdr.detectChanges(); 
    });
  }

  submit() {
    this.courseService.updateCourse(this.id, this.course).subscribe({
      next: () => {
        alert('Course Updated ');
        this.router.navigate(['/courses']);
      }
    });
  }
}
