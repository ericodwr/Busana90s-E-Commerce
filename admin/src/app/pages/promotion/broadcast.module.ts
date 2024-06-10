import { NgModule } from '@angular/core';
import { BroadcastRouting } from './broadcast.routing';

@NgModule({
  imports: [BroadcastRouting],
  exports: [BroadcastRouting],
})
export class BroadcastModule {}
