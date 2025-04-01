import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, ItemService } from '../services/items.service';
import { CartsService } from '../services/carts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  imports: [CommonModule], 
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  item!: Item;
  error: string = '';
  success: string = '';

  // For now, we use a fixed cart id inside the service.
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartsService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id).subscribe({
      next: (res) => this.item = res.data,
      error: (err) => this.error = 'Item not found'
    });
  }

  addToCart() {
    this.itemService.addToCart(this.item.id, 1).subscribe({
      next: (res) => this.success = 'Item added to cart!',
      error: (err) => this.error = 'Failed to add item to cart'
    });
  }
}
