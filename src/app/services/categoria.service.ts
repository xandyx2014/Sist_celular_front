import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaCategoria, Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  showCategoria() {
    return this.http.get<RespuestaCategoria>(`${ this.url }/categorias`);
  }
  storeCategoria(categoria: Categoria) {
    return this.http.post(`${this.url}/categorias`, categoria);
  }
  updateCategoria(categoria) {
    return this.http.put(`${this.url}/categorias/${categoria.id}`, categoria);
  }
  deleteCategoria(categoria) {
    return this.http.delete(`${this.url}/categorias/${categoria.id}`);
  }
}
