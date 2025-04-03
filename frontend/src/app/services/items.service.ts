import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

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
  constructor(private http: HttpClient, private authService: AuthService) { }

  getItems(): Observable<{ data: Item[] }> {
    return this.http.get<{ data: Item[] }>(`${this.apiUrl}/items`,{ headers: this.authService.getHeaderToken() });
  }

  getItem(id: number): Observable<{ data: Item }> {
    return this.http.get<{ data: Item }>(`${this.apiUrl}/items/${id}`,{ headers: this.authService.getHeaderToken() });
  }


  addToCart(itemId: number): Observable<any> {
    const headers = this.authService.getHeaderToken();
    return this.http.post(`${this.apiUrl}/items/${itemId}/add_to_cart`, {}, { headers }); 
  }

  getHeaderToken(): Observable<HttpHeaders> {
    const token = this.authService.getAuthToken();
    console.log(`token fetched: ${token}`);
    if(token){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(
        `#######################################################\nHeader token fetched: ${token}`
      );
      return of(headers);
    } 
    return of(new HttpHeaders().set('Failure', "Bearer token not found"));
  }

}
