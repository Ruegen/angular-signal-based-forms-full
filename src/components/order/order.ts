import { Component, signal } from '@angular/core';
import { form, Control } from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  imports: [Control],
})
class OrderComponent {
  name = 'Angular';
  order = signal({
    orderNumber: 1,
    customerName: '',
    product: 'Foobar',
    quantity: 1,
    deliveryDate: '',
    notes: '',
  });

  form = form(this.order);
}

export { OrderComponent };
