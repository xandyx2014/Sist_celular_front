import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  showFormulario() {
    return this.http.get<RespuestaFormulario>(`${ this.url }/formularios`);
  }

  storeFormulario( formulario: Formulario) {
    return this.http.post(`${this.url}/formularios`, formulario);
  }
  updateFormulario( formulario ) {
    return this.http.put(`${this.url}/formularios/${formulario.id}`, formulario);
  }
  deleteFormulario( formulario ) {
    return this.http.delete(`${this.url}/formularios/${formulario.id}`);
  }
  pdfRecibo(id) {
    return this.http.get(`${this.url}/recibos/${id}`);
  }
}
