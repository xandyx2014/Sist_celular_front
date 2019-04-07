import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaCliente, Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  showClientes() {
    return this.http.get<RespuestaCliente>(`${this.url}/users`);
  }

  storeClientes(cliente: Cliente) {
    return this.http.post(`${this.url}/users`, cliente);
  }

  updateCliente(cliente) {
    return this.http.put(`${this.url}/users/${cliente.id}`, cliente);
  }
  deleteCliente(cliente) {
    return this.http.delete(`${this.url}/users/${cliente.id}`);
  }
}
