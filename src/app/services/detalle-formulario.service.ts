import { Injectable } from '@angular/core';
import { RespuestaDetalleFormulario, DetalleFormulario } from '../interfaces/detalleFormulario';
import { HttpClient } from '@angular/common/http';
import { RespuestaDetalle } from '../interfaces/detalle.interface';

@Injectable({
  providedIn: 'root'
})
export class DetalleFormularioService {
  protected url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  storeDetalleFormulario(detalle: DetalleFormulario) {
    return this.http.post<RespuestaDetalleFormulario>(`${this.url}/detallesformularios`, detalle);
  }

  indexDetalleFormulario(id) {
    return this.http.get<RespuestaDetalle>(`${this.url}/detallesformularios/${id}`);
  }
  updateDetalleFormulario(detalle) {
    return this.http.put(`${this.url}/detallesformularios/${detalle.id}`, detalle );
  }
  deleteDetalleFormulario(detalle) {
    return this.http.delete(`${this.url}/detallesformularios/${detalle.id}`);
  }
}
