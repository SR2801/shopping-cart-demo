import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  item_id: number;
  item_count: number;
  // Optionally, if you have an item object:
  item: {
    name: string;
    price: number;
    // any other properties you need
  };
}

@Injectable({
  providedIn: 'root'
})

export class CartsService {

  private apiUrl = 'http://localhost:3000/carts';  // Adjust the URL as needed
//add cart details
  constructor(private http: HttpClient) { }
  private cartId:number = 6;
  // Get the cart
  getCart(cartId: number): Observable<any> {
    this.cartId = cartId;
    return this.http.get<any>(`${this.apiUrl}/${cartId}`);
  }

  
  getCartItems(): Observable<{ data: CartItem[] }> {
    return this.http.get<{ data: CartItem[] }>(`${this.apiUrl}/${this.cartId}`);
  }

  updateCartItem(cartItemId: number, op: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${this.cartId}/cart_items/${cartItemId}/update`, { op });
  }

  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.cartId}/cart_items/${cartItemId}/remove`);
  }
  deleteCart(cartId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${cartId}`);
  }
}
