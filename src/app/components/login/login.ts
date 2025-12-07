import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink, RouterLinkActive],
  templateUrl: './login.html',
})
export class Login {

  email: string = '';
  password: string = '';
    showLayout = true;

  constructor(
    private _auth: Auth,
    private _router: Router
  ) {
        this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = ['/login', '/register'];
        this.showLayout = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }

  login() {
    this._auth.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log(res);
        this._auth.saveToken(res.token);
        // localStorage.setItem('token', Response.token);
        this._router.navigate(['/courses']); 
      },
      error: (err) => {
        alert("Email or Password is incorrect");
        console.error(err);
      }
    });
  }
}
