import { Component, signal, computed, input, OnInit, WritableSignal } from '@angular/core';
import { form, Control, required, SchemaOrSchemaFn,  min } from '@angular/forms/signals';

interface IOrder {
    orderNumber: number;
    customerName: string;
    product: string;
    productId: number;
    quantity: number;
    deliveryDate: string;
    notes: string;
}

const orderschema: SchemaOrSchemaFn<IOrder> = (path) => {
    required(path.customerName, {message: 'Customer name is required'});
    min(path.quantity, 1, {message: 'Quantity must be at least 1'});
}
@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrl: './order.css',
  imports: [Control],
})
class OrderComponent implements OnInit {
  customer = input({name: '', email: ''});
  name = 'Angular';

  order: WritableSignal<IOrder> = signal({
    orderNumber: 1,
    customerName: '',
    product: 'Foobar',
    productId: 123,
    quantity: 1,
    deliveryDate: '',
    notes: '',
  });

  orderForm = form(this.order, orderschema);

  payload = computed(() => {
    const {deliveryDate, notes, quantity, productId} = this.order();
    return {date: deliveryDate, notes, quantity, productId};
  });

  public ngOnInit() {
    this.order.update((o) => {
      return {...o, customerName: this.customer().name};
    })
  }

  public submit($event: SubmitEvent) {
    $event.preventDefault();
    alert(JSON.stringify(this.payload(), null, 2));
  }
}

export { OrderComponent };
