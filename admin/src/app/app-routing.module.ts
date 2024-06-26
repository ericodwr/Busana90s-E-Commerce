import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BaseModule } from './components/base/base.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    path: 'broadcasts',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/promotion/broadcast.module').then(
        (u) => u.BroadcastModule
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
  declarations: [LoginComponent, DashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    BaseModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonComponent,
    NotFoundComponent,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
