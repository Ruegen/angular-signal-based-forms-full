import { Component, signal, computed, input, OnInit, WritableSignal } from '@angular/core';
import { form, Control, SchemaOrSchemaFn,  min, submit, TreeValidationResult, apply, Field } from '@angular/forms/signals';
import { validateDateRange, validateNotes } from './validations';
import { IOrder } from './interfaces';
import { customerNameSchema } from './schemas';
import { fakeHttpRequest } from '../helpers/fake-http-request';
import { extractOrder } from '../helpers/extract-order';

const orderschemaFn: SchemaOrSchemaFn<IOrder> = (path) => {
    apply(path.customerName, customerNameSchema);
    min(path.quantity, 1, {message: 'Quantity must be at least 1'});
    validateDateRange(path.deliveryDate, {startDate: new Date(), endDate: new Date()});
    validateNotes(path.notes, {minLength: 0, maxLength: 200});
}
@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrl: './order.css',
  imports: [Control],
})
class OrderComponent implements OnInit {
  customer = input({name: '', email: ''});

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

  payload = computed(() => extractOrder(this.order()));

  public ngOnInit() {
    this.order.update((order) => ({
      ...order,
      customerName: this.customer().name,
    }));
  }

  public onSubmit(event: SubmitEvent) {
    event.preventDefault();

    // console.log(this.orderForm().invalid());
    // console.log(this.orderForm.deliveryDate().errors());
    // console.log(this.orderForm.notes().errors());
    // console.log(this.orderForm.customerName().errors());
    // console.log(this.orderForm.quantity().errors());

    // if(this.orderForm().invalid()) {
    //   alert('Form is invalid, please correct the errors and try again. errors: ' + JSON.stringify(this.orderForm().errors()));
    //   return;
    // }

    submit(this.orderForm, async (form) => {
      try {
        await fakeHttpRequest(this.payload());
        form().reset();
        return;
      } catch (_error) {
        const errors: TreeValidationResult = [
          { kind: 'server', message: 'Submission failed, please try again later.' }
        ];
        return errors;
      }
    })
  }

  // public async action(form: Field<IOrder>): Promise<TreeValidationResult> {
  //   try {
  //     await fakeHttpRequest(this.payload());
  //     form().reset();
  //     return;
  //   } catch (_error) {
  //     const errors: TreeValidationResult = [
  //       { kind: 'server', message: 'Submission failed, please try again later.' }
  //     ];
  //     return errors;
  //   }
  // }
}

export { OrderComponent };
