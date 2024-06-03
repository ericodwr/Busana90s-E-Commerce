import { NgModule } from '@angular/core';
import { BaseComponent } from './base.component';
import { NavbarModule } from '../navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [BaseComponent],
  imports: [NavbarModule, RouterModule, FooterComponent],
})
export class BaseModule {}
