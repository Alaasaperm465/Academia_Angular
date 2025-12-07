import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Iuser } from '../../models/iuser';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,RouterLink,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  user:Iuser = {} as Iuser;
  registerForm!: FormGroup;
  showLayout =false;

  constructor(
    private fb: FormBuilder,
    private _userAuth: Auth,
    private _router: Router
  ) {
            this._router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe((event: any) => {
            const hiddenRoutes = ['/login', '/register'];
            this.showLayout = !hiddenRoutes.includes(event.urlAfterRedirects);
          });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this._router.navigate(['/courses']); 
      return;
    }

    const user: Iuser = this.registerForm.value;

    console.log(user);

    // API Call
    this._userAuth.Register(user).subscribe({
      next: (res) => {
        console.log('Register Success', res);
      },
      error: (err) => {
        console.log('Register Error', err);
      }
    });
  }
}
