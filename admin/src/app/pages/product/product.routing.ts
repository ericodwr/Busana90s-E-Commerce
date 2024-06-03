import { NgModule } from '@angular/core';
import { ListProductComponent } from './list/list-product.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CreateProductComponent } from './create/create-product.component';
import { EditProductComponet } from './edit/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductComponent,
  },
  {
    path: 'create',
    component: CreateProductComponent,
  },
  {
    path: 'edit/:id',
    component: EditProductComponet,
  },
];

@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent,
    EditProductComponet,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonComponent,
  ],
  exports: [RouterModule],
})
export class ProductRouting {}
