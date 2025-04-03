import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ItemsComponent } from './items/items.component';
import { CartComponent } from './carts/carts.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'register', component: RegistrationComponent
  },
  { 
    path: 'carts', 
    component: CartComponent, 
    canActivate: [authGuard]
  },
  {
    path: '', 
    redirectTo: '/items',
    pathMatch: 'full'
  },
  { path: 'items/:id', component: ItemViewComponent },
  { path: 'items', component: ItemsComponent },
  // { path: '**', redirectTo: '/login' }
];
