import { NgModule } from '@angular/core';
import { BannerRouting } from './banner.routing';

@NgModule({
  imports: [BannerRouting],
  exports: [BannerRouting],
})
export class BannerModule {}
