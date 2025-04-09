import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartComponent } from "./carts/carts.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
    CommonModule,
    CartComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
isAuthenticated: any;
showCart: boolean  = false;
  // private isCartOpen: boolean = false;
  // get previewCart(): boolean { 
  //   this.isCartOpen = (this.isCartOpen != false);
  //   return this.isCartOpen;
  // }
  constructor (public authService: AuthService, private router: Router){}
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  title = 'frontend';


  get cartState() {
    return this.showCart ? 'in' : 'out';
  }
  toggleCart() {
    this.showCart = !this.showCart;
  }
}
