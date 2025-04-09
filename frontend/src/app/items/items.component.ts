import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item, ItemService } from '../services/items.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from "../carts/carts.component";
import { CartSyncService } from '../shared/cart-sync.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-items-list',
  templateUrl: './items.component.html',
  imports: [CommonModule, CartComponent], 
  standalone: true,
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  error: string = '';
  alert: string = '';
  alert_id: number = 0;
  isAuthenticated: boolean = false;
  showCart: boolean = false;

  constructor(private itemService: ItemService, private cartSyncService: CartSyncService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.itemService.isAuthenticated();
      this.itemService.getItems().subscribe({
        next: (res: { data: Item[]; }) => this.items = res.data,
        error: (err: any) => this.error = 'Could not load items'
      });
      this.cartSyncService.notifyItemEvent();
  }

  viewItem(item: Item) {
    this.router.navigate(['/items', item.id]);
  }

  addToCart(itemId: number) {
    this.showCart = true;
    if(!this.isAuthenticated){
      this.alert = "Please login";
      this.alert_id  = itemId;
      return;
    }
    this.itemService.addToCart(itemId).subscribe({
      next: (res) => {
        this.alert = res.message,
        this.cartSyncService.notifyItemEvent();
      },
      error: (err) => this.alert = "Error: " + JSON.stringify(err.error.error).slice(1, -1)
    });
    this.alert_id = itemId;
  }
  
  toggleCart() {
    this.showCart = !this.showCart;
  }
}
