import { NgModule } from '@angular/core';
import { ProductRouting } from './product.routing';

@NgModule({
  imports: [ProductRouting],
  exports: [ProductRouting],
})
export class ProductModule {}
