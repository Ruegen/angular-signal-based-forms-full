import { Component, resource, ResourceRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { OrderComponent } from './components/order/order';
import { IProduct, IUser } from './global-interfaces';
// import { OrderDemoComponent } from './components/order-demo/order-demo';

@Component({
  selector: 'app-root',
  template: `
    @if(!user.value()) {
      <p class="loading">Loading user...</p>
    } @else {
      <app-order [customer]="user.value() ?? null" [product]="product" />
    }
  `,
  imports: [OrderComponent],
})
export class App {

  user: ResourceRef<IUser | undefined> = resource({
    loader: () => {
      return new Promise<IUser>((resolve) => {
        setTimeout(() => {

          const user: IUser = {
            id: 'a1b2c3d4',
            contact: { 
              email: 'cody@example.com',
              phone: '+45 101 468 435',
            },
            name: 'Cody Rhodes'
          };

          resolve(user);


        }, 1000);
      });
    }
  });

  product: IProduct = {
    id: 'p1q2r3s4',
    name: 'Wrestlemaina Figurine',
    description: 'A figurine of a famous wrestler.',
    price: 29.99,
  }
  
}

bootstrapApplication(App);