import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface CartItem {
  id: number;
  item_count: number;
  sub_total: number;
  // Optionally, if you have an item object:
  item: {
    id: number;
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
  constructor(private http: HttpClient, private authService: AuthService) { }

  private cartId:number = 6;
  // Get the cart
  // getCart(cartId: number): Observable<any> {
    // // return this.http.get<any>(`${this.apiUrl}/${cartId}`);
    // return this.http.get<any>(this.apiUrl,  { headers: this.authService.getHeaderToken() });
  // }

  // private  headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage['token']}`, // Use the token in the Authorization header
  //   'Content-Type': 'application/json' // Add Content-Type if needed
  // });
  isAuthenticated(): boolean{
    return this.authService.isAuthenticated()
  }
  getCartItems(): Observable<{ data: CartItem[] }> {
    return this.http.get<{ data: CartItem[] }>(`${this.apiUrl}/`,  { headers: this.authService.getHeaderToken() });
  }

  updateCartItem(cartItemId: number, op: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${this.cartId}/cart_items/${cartItemId}/update`, { op: op },{ headers: this.authService.getHeaderToken() });
  }

  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.cartId}/cart_items/${cartItemId}/remove`, {headers: this.authService.getHeaderToken() });
  }
  deleteCart(cartId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`, { headers: this.authService.getHeaderToken() });
  }

    // Get the authentication token
}
