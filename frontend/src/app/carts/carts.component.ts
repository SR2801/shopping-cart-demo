import { Component, OnInit } from '@angular/core';
import { CartsService, CartItem } from '../services/carts.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './carts.component.html',
  imports: [CommonModule, FormsModule], 
  styleUrls: ['./carts.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  error: string = '';
  isAuthenticated: Boolean | null= null;
  digit: string = '';


  constructor(private cartService: CartsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log(`Authenitcated????????????? ${this.isAuthenticated}`)
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (res: { data: CartItem[]; }) => this.cartItems = res.data,
      error: (err: any) => this.error = 'Could not load cart'
    });
  }

  updateItem(cartItem: CartItem, op: string) {
    this.cartService.updateCartItem(cartItem.id, op).subscribe({
      next: () => { 
        this.loadCart(); 
        this.error = "";
      },
      error: (_err) => this.error = 'Could not update item'
    });
  }

  removeItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe({
      next: () => this.loadCart(),
      error: (_err) => this.error = 'Could not remove item'
    });
  }
  onDigitInput(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (/^\d$/.test(value)) {
      this.digit = value; // Valid digit
    } else {
      this.digit = ''; // Invalid, clear the input
      input.value = ''; // Clear the displayed value.
    }
  }


  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToSignup() {
    this.router.navigate(['/register']);
  }

  // Calculate total price if items include a price property
  get totalPrice(): number {
    return this.cartItems.reduce((total, ci) => total + (ci.item.price || 0) * ci.item_count, 0);
  }
}
