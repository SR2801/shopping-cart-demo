import { Component, OnInit } from '@angular/core';
import { CartsService, CartItem } from '../services/carts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './carts.component.html',
  imports: [CommonModule], 
  styleUrls: ['./carts.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  error: string = '';

  constructor(private cartService: CartsService) { }

  ngOnInit(): void {
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
      next: () => this.loadCart(),
      error: (_err) => this.error = 'Could not update item'
    });
  }

  removeItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe({
      next: () => this.loadCart(),
      error: (_err) => this.error = 'Could not remove item'
    });
  }

  // Calculate total price if items include a price property
  get totalPrice(): number {
    return this.cartItems.reduce((total, ci) => total + (ci.item.price || 0) * ci.item_count, 0);
  }
}
