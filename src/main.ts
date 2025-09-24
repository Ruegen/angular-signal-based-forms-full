import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { OrderComponent } from './components/order/order';

@Component({
  selector: 'app-root',
  template: `
    <app-order />
  `,
  imports: [OrderComponent],
})
export class App {}

bootstrapApplication(App);
