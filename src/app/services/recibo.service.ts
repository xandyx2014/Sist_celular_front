import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaRecibo } from '../interfaces/recibos.interface';

@Injectable({
  providedIn: 'root'
})
export class ReciboService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  showRecibo() {
    return this.http.get<RespuestaRecibo>(`${this.url}/recibos`);
  }
}
