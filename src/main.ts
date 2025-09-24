import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { OrderComponent } from './components/order/order';
import { IProduct, IUser } from './main-interfaces';

@Component({
  selector: 'app-root',
  template: `
    <app-order [customer]="user" [product]="product" />
  `,
  imports: [OrderComponent],
})
export class App {
  user: IUser = {
    id: 'a1b2c3d4',
    contact: { email: 'cody@example.com', phone: '+45 101 468 435' },
    name: 'Cody Rhodes'
  };
  product: IProduct = {
    id: 'p1q2r3s4',
    name: 'Wrestlemaina Figurine',
    description: 'A figurine of a famous wrestler.',
    price: 29.99,
  }
}

bootstrapApplication(App);
