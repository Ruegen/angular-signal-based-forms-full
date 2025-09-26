import { Component, signal, computed, input, WritableSignal, effect, ResourceRef, Signal, resource, ResourceOptions, ChangeDetectionStrategy } from '@angular/core';
import { form, Control, min, submit, TreeValidationResult, apply, disabled, validateAsync, AsyncValidatorOptions, RootFieldContext, customError, validate } from '@angular/forms/signals';
import { validateDateRange, validateNotes } from './validations';
import { customerNameSchema, orderSpecialSchema, schemaProductRef } from './schemas';
import { fakeHttpRequest } from '../helpers/fake-http-request';
import { extractOrder } from '../helpers/extract-order';
import { IProduct, IUser, IOrder } from '../../global-interfaces';
import { fakeHttpProductCheck } from '../helpers/fake-http-product-check';

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrl: './order.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Control],
})
class OrderComponent {
  customer = input<IUser | null>(null);
  product = input<IProduct | null>(null);
  

  order: WritableSignal<IOrder> = signal({
    orderNumber: 1,
    customer: null,
    product: null,
    quantity: 1,
    deliveryDate: null,
    special: null,
    notes: '',
  });

  orderForm = form<IOrder>(this.order, (path) => {
    
    min(path.quantity, 1, {message: 'Quantity must be at least 1'});
    validateDateRange(path.deliveryDate, {startDate: new Date(), endDate: new Date()});
    validateNotes(path.notes, {minLength: 0, maxLength: 200});

    // apply(path, disableAll(() => this.orderForm().submitting()));
    // const fields: Array<keyof IOrder> = ['deliveryDate', 'notes', 'quantity'];
    // apply(path, disableAll<IOrder>(fields, () => this.orderForm().submitting()));

    disabled(path.deliveryDate, () => this.orderForm().submitting())
    disabled(path.notes, () => this.orderForm().submitting())
    disabled(path.quantity, () => this.orderForm().submitting())
    disabled(path.special, () => this.orderForm().submitting())

    
    // apply(path, orderSpecialSchema);


    // validateAsync(path.product, schemaProductRef);


    apply(path.customer, customerNameSchema);
});

  total = computed(() => {
    const product = this.product();
    const quantity = this.order().quantity;
    return ((product?.price || 0) * quantity).toFixed(2);
  });
  payload = computed(() => extractOrder(this.order()));
  disabled = computed(() => this.orderForm().submitting());

  constructor() {
    effect(() => {
      this.order.update((order) => ({
        ...order,
        customer: this.customer(),
        product: this.product(),
      }));  
    })
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
        console.log('now sending order', this.payload());
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
