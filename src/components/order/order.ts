import { Component, signal, computed } from '@angular/core';
import { form, Control } from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrl: './order.css',
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
  
  payload = computed(() => {
    const {deliveryDate, notes, product, quantity} = this.order();
    return {date: deliveryDate, notes, product, quantity};
  });

  public submit($event: SubmitEvent) {
    $event.preventDefault();
    console.log('Order submitted:', this.payload());
  }
}

export { OrderComponent };
