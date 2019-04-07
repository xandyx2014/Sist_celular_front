import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo = '';
  myForm: FormGroup;
  constructor(
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              ) { }

  ngOnInit() {
    this.activateRoute.data.subscribe( resp => {
      this.titulo = resp.titulo;
    });
    this.crearFormulario();
  }

  crearFormulario() {
    this.myForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.loginService.login(this.myForm.value).subscribe( (resp: any) => {
      if (resp.ok) {
        this.loginService.isLogin = true;
        this.loginService.guardarInformacion(resp.token);
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          title: `Usuario ${this.myForm.value.usuario} equivocado`,
          text: resp.message
        });
      }
    });
  }

}
