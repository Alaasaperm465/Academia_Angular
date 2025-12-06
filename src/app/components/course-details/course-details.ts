import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CourseService, Course } from '../../services/course';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './course-details.html'
})
export class CourseDetails implements OnInit {

  course!: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe(res => {
      this.course = res;
    });
  }
}
