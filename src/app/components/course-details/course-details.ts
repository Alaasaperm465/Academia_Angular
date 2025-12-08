import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CourseService, Course } from '../../services/course';
import { Instructor, InstructorService } from '../../services/instructor';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './course-details.html'
})
export class CourseDetails implements OnInit {

  course!: Course;
  courses: Course[] = [];

  currentIndex = -1;
  hasNext = false;
  hasPrevious = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private _instructorService: InstructorService,
  ) {}

ngOnInit(): void {

  this._instructorService.getInstructors().subscribe(instructors => {
    this._instructorService.instructors = instructors;

    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;

      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        this.loadCourse(id);
      });
    });

  });

}

  getInstructorName(id: number): string {
  return this._instructorService.getInstructorNameById(id);
  }

  loadCourse(id: number) {
    this.courseService.getCourseById(id).subscribe(res => {
      this.course = res;

      this.currentIndex = this.courses.findIndex(c => c.id === id);

      this.hasPrevious = this.currentIndex > 0;
      this.hasNext = this.currentIndex < this.courses.length - 1;

      this.cdr.detectChanges(); 
    });
  }

  goNext() {
    if (this.hasNext) {
      const nextId = this.courses[this.currentIndex + 1].id;
      this.router.navigate(['/courseDetails', nextId]);
    }
  }

  goPrevious() {
    if (this.hasPrevious) {
      const prevId = this.courses[this.currentIndex - 1].id;
      this.router.navigate(['/courseDetails', prevId]);
    }
  }
}
