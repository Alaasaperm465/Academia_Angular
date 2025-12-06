import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../models/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  apiUrlRegister = "https://localhost:7252/api/Account/register";
  apiUrlLogin = "https://localhost:7252/api/Account/login";

  constructor(private _http: HttpClient) {}

  Register(newUser: Iuser): Observable<any> {
    return this._http.post(this.apiUrlRegister, newUser);
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post(this.apiUrlLogin, {
      email: email,
      password: password
    });
    
  }

  saveToken(token: string) {
    localStorage.setItem('mytoken', token);
  }

  logout() {
    localStorage.removeItem('mytoken');
  }

  loginauth(): boolean {
    return !!localStorage.getItem('mytoken');
  }
}
