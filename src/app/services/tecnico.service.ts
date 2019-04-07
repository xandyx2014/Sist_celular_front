import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTecnico, Tecnico } from '../interfaces/tecnico.interface';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  showTecnicos() {
    return this.http.get<RespuestaTecnico>(`${this.url}/tecnicos`);
  }
  storeTecnicos(tecnico: Tecnico) {
    return this.http.post(`${this.url}/tecnicos`, tecnico);
  }
  updateTecnico(tecnico) {
    return this.http.put(`${this.url}/tecnicos/${tecnico.id}`, tecnico);
  }
  deleteTecnico(tecnico) {
    return this.http.delete(`${this.url}/tecnicos/${tecnico.id}`);
  }
}
