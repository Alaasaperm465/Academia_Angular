import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-instructor-details',
  imports: [],
  templateUrl: './instructor-details.html',
  styleUrl: './instructor-details.css',
})
export class InstructorDetails {

  constructor(private cdr: ChangeDetectorRef) {}


}
