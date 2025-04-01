import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  description?: string;
  price?: number;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getItems(): Observable<{ data: Item[] }> {
    return this.http.get<{ data: Item[] }>(`${this.apiUrl}/items`);
  }

  getItem(id: number): Observable<{ data: Item }> {
    return this.http.get<{ data: Item }>(`${this.apiUrl}/items/${id}`);
  }

  addToCart(itemId: number, cartId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/items/${itemId}/add_to_cart?cart_id=${cartId}`, {});
  }
}
