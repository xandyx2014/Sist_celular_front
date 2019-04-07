import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaItem, Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  showItem() {
    return this.http.get<RespuestaItem>(`${ this.url }/items`);
  }
  storeItem(item: Item) {
    return this.http.post(`${ this.url }/items`, item);
  }
  updateItem(item) {
    return this.http.put(`${ this.url}/items/${ item.id }`, item);
  }
  deleteItem(item) {
    return this.http.delete(`${ this.url}/items/${ item.id }`);
  }
}
