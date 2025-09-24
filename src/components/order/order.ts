import { Component, signal, computed, input, OnInit } from '@angular/core';
import { form, Control, required } from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrl: './order.css',
  imports: [Control],
})
class OrderComponent implements OnInit {
  customer = input({name: '', email: ''});
  name = 'Angular';
  order = signal({
    orderNumber: 1,
    customerName: '',
    product: 'Foobar',
    quantity: 1,
    deliveryDate: '',
    notes: '',
  });

  form = form(this.order, (path) => {
    required(path.customerName, {message: 'Customer name is required'});
  });

  payload = computed(() => {
    const {deliveryDate, notes, product, quantity} = this.order();
    return {date: deliveryDate, notes, product, quantity};
  });

  public ngOnInit() {
    this.order.update((o) => {
      return {...o, customerName: this.customer().name};
    })
  }

  public submit($event: SubmitEvent) {
    $event.preventDefault();
    console.log('Order submitted:', this.payload());
  }
}

export { OrderComponent };
