import { RouterModule, Routes } from '@angular/router';
import { ListBannerComponent } from './list/list-banner.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CreateBannerComponent } from './create/create-banner.component';

const routes: Routes = [
  {
    path: '',
    component: ListBannerComponent,
  },
  {
    path: 'create',
    component: CreateBannerComponent,
  },
];

@NgModule({
  declarations: [ListBannerComponent, CreateBannerComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  exports: [RouterModule],
})
export class BannerRouting {}
