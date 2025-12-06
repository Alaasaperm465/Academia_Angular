import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstructor } from './add-instructor';

describe('AddInstructor', () => {
  let component: AddInstructor;
  let fixture: ComponentFixture<AddInstructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInstructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInstructor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
