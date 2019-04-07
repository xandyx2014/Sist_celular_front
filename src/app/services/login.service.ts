import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000';
  isLogin = false;
  constructor(private http: HttpClient) {
  }
  login(username) {
    return this.http.post(`${this.url}/login/auth`, username);
  }
  guardarInformacion(token) {
    localStorage.setItem('token', JSON.stringify( { token }));
  }
  existeToken(): boolean {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('token');
  }
}
