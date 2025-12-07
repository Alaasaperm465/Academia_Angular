import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private _auth: Auth, private _router: Router) {}

  logout() {
    this._auth.logout();            // حذف التوكن
    this._router.navigate(['/login']); // يرجعه لصفحة اللوجين
  }

  isLoggedIn(): boolean {
    return this._auth.loginauth();
  }
}
