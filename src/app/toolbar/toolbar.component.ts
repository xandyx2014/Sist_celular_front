import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() toolbar = new EventEmitter();
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  isLogin() {
    return this.loginService.isLogin || this.loginService.existeToken();
  }
  logout() {
    this.loginService.logout();
    this.loginService.isLogin = false;
  }
  onClick() {
    this.toolbar.emit();
  }
}
