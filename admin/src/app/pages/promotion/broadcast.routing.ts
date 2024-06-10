import { NgModule } from '@angular/core';
import { ListBroadcastComponent } from './list/list-broadcast.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CreateBroadcastComponent } from './create/create-broadcast.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListBroadcastComponent,
  },
  {
    path: 'create',
    component: CreateBroadcastComponent,
  },
];

@NgModule({
  declarations: [ListBroadcastComponent, CreateBroadcastComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class BroadcastRouting {}
