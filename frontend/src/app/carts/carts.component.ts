import { Component, OnInit } from '@angular/core';
import { CartsService, CartItem, Cart } from '../services/carts.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CartSyncService } from '../shared/cart-sync.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './carts.component.html',
  imports: [CommonModule, FormsModule, RouterModule], 
  standalone: true, 
  styleUrls: ['./carts.component.css']
})
export class CartComponent implements OnInit {
parseFloat(arg0: number) {
throw new Error('Method not implemented.');
}
  private itemComponentEvent!: Subscription;
  totalPrice: number = 0;
  cartItems: CartItem[] = [];
  error: string = '';
  isAuthenticated: boolean = false;
  digit: string = '';
  subTotals: any = {};


  constructor(private cartService: CartsService,  private cartSyncService: CartSyncService, private router: Router) { }
  ngOnInit(): void {
    this.isAuthenticated = this.cartService.isAuthenticated();
    console.log(`Authenitcated????????????? ${this.isAuthenticated}`);
      this.itemComponentEvent = this.cartSyncService.itemComponentEvent.subscribe(()=> {
        this.loadCart();
        console.log("Cart loaded");
      });
    this.loadCart();
  };


  ngOnDestroy(): void {
    this.itemComponentEvent.unsubscribe();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (res: { data: CartItem[]; total_price: number } ) => {
        console.log("REfreshin cart,",res);
        this.cartItems = res.data;
        this.totalPrice = res.total_price;

        //For frontend subtotal calculation
        // this.cartItems.forEach((cartItem: CartItem) => {
          // this.subTotals[cartItem.id] =  this.calcSubTotal(cartItem);
        // })
      },
      error: (err: any) => this.error = 'Could not load cart'
    });
  }

  updateItem(cartItem: CartItem, op: string) {
    this.cartService.updateCartItem(cartItem.id, op).subscribe({
      next: () => { 
        this.loadCart(); 
        this.error = "";

        //For frontend subtotal calculation
        // this.subTotals[cartItem.id] = this.calcSubTotal(cartItem);
      },
      error: (_err) => {
        this.error = 'Could not update item. '+ JSON.stringify(_err.error.error).slice(1,-1);
        this.loadCart();
      }
    });
  }

  removeItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe({
      next: () => {
        this.loadCart();

        //For frontend subtotal calculation
        // delete this.subTotals[cartItem.id];
      },
      error: (err) => this.error = 'Could not remove item. ' 
    });
  }

  deleteCart() {
    this.cartService.deleteCart().subscribe({
      next: ()=>{
        this.loadCart();
      },
      error: (err) => this.error = "Could not empty cart."
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToSignup() {
    this.router.navigate(['/register']);
  }

  // Calculate total price if items include a price property

  calcSubTotal(cartItem: CartItem) {
    return cartItem.item_count * cartItem.item.price;
  }
  // get totalPrice(): number {
  //   // return this.cartItems.reduce((total, ci) => total + (ci.item.price || 0) * ci.item_count, 0);
  //   return this.cartItems.reduce((total, ci) => total + (ci.subtotal || 0), 0);
  // }
}
