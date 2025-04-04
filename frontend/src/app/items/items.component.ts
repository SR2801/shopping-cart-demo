import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, ItemService } from '../services/items.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-list',
  templateUrl: './items.component.html',
  imports: [CommonModule], 
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  error: string = '';
  alert: string = '';
  alert_id: number = 0;

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe({
      next: (res: { data: Item[]; }) => this.items = res.data,
      error: (err: any) => this.error = 'Could not load items'
    });
  }

  viewItem(item: Item) {
    this.router.navigate(['/items', item.id]);
  }

  addToCart(itemId: number) {
    this.itemService.addToCart(itemId).subscribe({
      next: (res) => {
        this.alert = res.message;
        this.alert_id = res.item.item_id;
      },
      error: (err) => this.alert = JSON.stringify(err.error.error).slice(1, -1)
    });
  }
}
