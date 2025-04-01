import { Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { CartComponent } from './carts/carts.component';
import { ItemViewComponent } from './item-view/item-view.component';

export const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'cart', component: CartComponent},
  { path: 'items/:id', component: ItemViewComponent }
];
