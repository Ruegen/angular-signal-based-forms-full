import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IProduct, IUser } from '../../global-interfaces';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-order-demo',
  templateUrl: './order-demo.html',
  styleUrl: './order-demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
})
class OrderDemoComponent {
  customer = input<IUser | null>(null);
  product = input<IProduct | null>(null);
  

  constructor() {}

  public onSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

}

export { OrderDemoComponent };