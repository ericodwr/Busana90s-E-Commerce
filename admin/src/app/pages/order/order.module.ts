import { NgModule } from '@angular/core';
import { OrderRouting } from './order.routing';

@NgModule({
  imports: [OrderRouting],
  exports: [OrderRouting],
})
export class OrderModule {}
