import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartSyncService {
  private itemEventSubject = new Subject<void>();

  itemComponentEvent = this.itemEventSubject.asObservable();

  notifyItemEvent() {
    this.itemEventSubject.next();
    console.log("Notified cart component");
  }
}
