import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface CartItem {
  id: number;
  item_count: number;
  subtotal: string;
  // Optionally, if you have an item object:
  item: {
    id: number;
    name: string;
    price: number;
    // any other properties you need
  };
}

export interface Cart{
  cartItems: CartItem[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})

export class CartsService {

  private apiUrl = 'http://localhost:3000/carts';  // Adjust the URL as needed
//add cart details
  constructor(private http: HttpClient, private authService: AuthService) { }
  // Get the cart
  // getCart(cartId: number): Observable<any> {
    // // return this.http.get<any>(`${this.apiUrl}/${cartId}`);
    // return this.http.get<any>(this.apiUrl,  { headers: this.authService.getHeaderToken() });
  // }

  // private  headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage['token']}`, // Use the token in the Authorization header
  //   'Content-Type': 'application/json' // Add Content-Type if needed
  // });
  // isAuthenticated(): boolean{
  //   return this.authService.isAuthenticated()
  // }
  getCartItems(): Observable<{ data: CartItem[]; total_price: number }> {
    console.log("Fetching from backend");
    return this.http.get<{ data: CartItem[] ; total_price: number }>(`${this.apiUrl}/`,  { headers: this.authService.getHeaderToken() });
  }
  updateCartItem(cartItemId: number, op: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${cartItemId}/update`, { op: op },{ headers: this.authService.getHeaderToken() });
  }

  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartItemId}/remove`, {headers: this.authService.getHeaderToken() });
  }
  deleteCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`, { headers: this.authService.getHeaderToken() });
  }

  isAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }
}
