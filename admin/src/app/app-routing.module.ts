import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BaseModule } from './components/base/base.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from './components/button/button.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {
  authNonLoginValidation,
  authValidation,
} from './validation/auth.validation';

const routes: Routes = [
  {
    path: 'products',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/product/product.module').then((u) => u.ProductModule),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'banners',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/banner/banner.module').then((u) => u.BannerModule),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'orders',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/order/order.module').then((u) => u.OrderModule),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'promotions',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/promotion/promotion.module').then(
        (u) => u.PromotionModule
      ),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [authValidation],
  },
  {
    path: 'dashboard',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
    canMatch: [authNonLoginValidation],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forRoot(routes),
    BaseModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonComponent,
    NotFoundComponent,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
