import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(
    private _auth: Auth,
    private _router: Router
  ) {}

  login() {
    this._auth.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log(res);
        this._auth.saveToken(res.token);
        this._router.navigate(['/courses']); 
      },
      error: (err) => {
        alert("Email or Password is incorrect");
        console.error(err);
      }
    });
  }
}
