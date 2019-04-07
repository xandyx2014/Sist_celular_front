import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  titulo = '';
  constructor(private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.data.subscribe( ( data ) => {
        this.titulo = data.titulo;
    } );
  }
}
