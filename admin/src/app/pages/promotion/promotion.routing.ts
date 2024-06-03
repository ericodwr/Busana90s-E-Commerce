import { NgModule } from '@angular/core';
import { ListPromotionComponent } from './list/list-promotion.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CreatePromotionComponent } from './create/create-promotion.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListPromotionComponent,
  },
  {
    path: 'create',
    component: CreatePromotionComponent,
  },
];

@NgModule({
  declarations: [ListPromotionComponent, CreatePromotionComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class PromotionRouting {}
