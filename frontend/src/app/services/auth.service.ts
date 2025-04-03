import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { isPlatformBrowser, Location } from "@angular/common";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private baseUrl = 'http://localhost:3000';
    private tokenKey = 'token';
    private credentials:any  = {} 
  
    constructor(private http: HttpClient, private router: Router, private location: Location, @Inject(PLATFORM_ID) private platformId: Object) {}
  
    // login(email: string, password: string) { 
    //     return this.http.post(`${this.baseUrl}/users/sign_in`, { user: { email, password } })
    //     .pipe(
    //         tap((res:any) => {
    //             localStorage.setItem(this.tokenKey, res.token);
    //         })
    //     )
    // }


  storePreviousUrl() {
    localStorage.setItem('previousUrl', this.location.path());
  }

  login(email: string, password: string) {
    console.log("Credentials: ",email, password);
    this.credentials = {email: email, password: password}
    return this.http.post(`${this.baseUrl}/users/sign_in`, this.credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log(`localstorgae stored!!!!!!!!: ${localStorage.getItem('token')}`)
          localStorage.setItem('cart_id', response.cart_id);
        }
        else{
          console.error("No cart_id");

        }
        return response;
      })
    );
  }

  redirectToPreviousUrl() {
    const previousUrl = localStorage.getItem('previousUrl');
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
      localStorage.removeItem('previousUrl'); // Clear the stored URL
    } else {
      this.router.navigate(['/']); // Navigate to default page
    }
  }
  
    register(user:any): Observable<any> {
      console.log("Register POST call: ", user);
        return this.http.post<any>(`${this.baseUrl}/users`, { user });
      }
    
    logout() {
        localStorage.removeItem(this.tokenKey);
        // this.router.navigate(['/login']);
    }

    getAuthToken():string | null {
        return (this.isAuthenticated())?localStorage.getItem(this.tokenKey) : null;
    }

    isAuthenticated(): boolean {
        if (isPlatformBrowser(this.platformId)) { 
          return !!localStorage.getItem('token');
        }
        return false;
      }

      getHeaderToken(): HttpHeaders {
        const token = this.getAuthToken();
        if (!token) {
          console.error('No token found in localStorage!');
          return new HttpHeaders(); // Return an empty headers object to avoid errors
        }
        console.log(`token fetched: ${token}`)
        
        console.log(`#######################################################\nHeader token fetched: ${token}`)
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      }
      

      // getHeaderToken(): HttpHeaders {
      //   const token =  this.getAuthToken(); 
      //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      //   return headers;
      // }
  }

  