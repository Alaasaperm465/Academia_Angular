import { Routes } from '@angular/router';
import { Course } from './services/course';
import { Courses } from './components/courses/courses';
import { Login } from './components/login/login';
import { Instructors } from './components/instructors/instructors';
import { authGuard } from './guards/auth-guard';
import {AddCourse} from './components/add-course/add-course';
import {InstructorDetails} from './components/instructor-details/instructor-details';
import { AddInstructor } from './components/add-instructor/add-instructor';
import { CourseDetails } from './components/course-details/course-details';
import { Register } from './components/register/register';
import { Students } from './components/students/students';
import { AddStudent } from './components/add-student/add-student';
import { StudentDetails } from './components/student-details/student-details';
import { EditCourse } from './components/edit-course/edit-course';


export const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: Home, title: 'Home Page' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'courses', component: Courses, title: 'course Page', canActivate:[authGuard] },
  { path: 'add-course', component: AddCourse, title: 'add course Page', canActivate:[authGuard] },
  { path: 'courseDetails/:id', component: CourseDetails, title:"course details", canActivate:[authGuard] },
  { path: 'edit-course/:id', component: EditCourse ,title:"edit course", canActivate:[authGuard] },
  { path: 'login' , component:Login, title:'Login Page'},
  { path: 'register' , component:Register, title:'Login Page'},
  { path: 'instructors', component: Instructors, title: 'Products Page', canActivate:[authGuard]},
  { path: 'instructorDetails', component: InstructorDetails, title: 'instructor Details', canActivate:[authGuard] },
  { path: 'addInstructor', component: AddInstructor, title: 'Add Instructor', canActivate:[authGuard] },
  { path: 'students', component: Students, title: 'Students', canActivate:[authGuard] },
  { path: 'addStudent', component: AddStudent, title: 'Add Students', canActivate:[authGuard] },
  { path: 'atudentDetails', component: StudentDetails, title: 'Student Details', canActivate:[authGuard] },

];