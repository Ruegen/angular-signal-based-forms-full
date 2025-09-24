import { Component, signal, computed, input, OnInit, WritableSignal } from '@angular/core';
import { form, Control, SchemaOrSchemaFn,  min, submit, TreeValidationResult, schema, apply } from '@angular/forms/signals';
import { validateDateRange, validateNotes } from './validations';
import { IOrder } from './interfaces';
import { customerNameSchema } from './schemas';

const orderschemaFn: SchemaOrSchemaFn<IOrder> = (path) => {
    apply(path.customerName, customerNameSchema);
    min(path.quantity, 1, {message: 'Quantity must be at least 1'});
    validateDateRange(path.deliveryDate, {startDate: new Date(), endDate: new Date()});
    validateNotes(path.notes, {minLength: 10, maxLength: 200});
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

  orderForm = form<IOrder>(this.order, orderschemaFn);

  payload = computed(() => {
    const {deliveryDate, notes, quantity, productId} = this.order();
    return {date: deliveryDate, notes, quantity, productId};
  });

  public ngOnInit() {
    this.order.update((o) => {
      return {...o, customerName: this.customer().name};
    })
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    submit(this.orderForm, async (form): Promise<TreeValidationResult> => {
      try {
        await fakeHttpRequest(this.payload());
        form().reset();
        return undefined;
      } catch (error) {
        return [{ kind: 'server', message: 'Submission failed, please try again later.' }];
      }
    })
  }
}

export { OrderComponent };
