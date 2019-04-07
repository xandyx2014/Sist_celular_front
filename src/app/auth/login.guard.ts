import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad, CanActivate  {
  constructor(private router: Router,
              private loginService: LoginService) {
              }

  canLoad(): boolean {
    return this.verificarLogin();
  }
  canActivate(): boolean {
    return this.verificarLogin();
  }
  verificarLogin(): boolean {
    const token = this.loginService.existeToken();
    if (this.loginService.isLogin || token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
