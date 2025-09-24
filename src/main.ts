import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { OrderComponent } from './components/order/order';

@Component({
  selector: 'app-root',
  template: `
    <app-order [customer]="customer" />
  `,
  imports: [OrderComponent],
})
export class App {
  customer = { name: 'Alice', email: 'alice@example.com' };
}

bootstrapApplication(App);
