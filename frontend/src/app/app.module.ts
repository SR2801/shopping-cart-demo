import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { ItemsComponent } from './items/items.component';
import { CartComponent } from './carts/carts.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    CartComponent
  ],
  imports: [
    NgModule,
    BrowserModule,
    AppRoutingModule,  // Make sure AppRoutingModule is imported here
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
