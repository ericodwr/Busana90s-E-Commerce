import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CANCELED, PAID, SHIPPING } from 'src/app/constant/contant';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    firstValueFrom(this.productService.getAllProduct())
      .then((res) => {
        this.totalProducts = res.length;
        this.productSold = res.filter((p) => !p.status).length;
        this.productsActive = res.filter((p) => p.status).length;
      })
      .catch((err) => console.log(err));

    firstValueFrom(this.categoryService.getAll())
      .then((res) => {
        this.allCategories = res.length;
      })
      .catch((err) => console.log(err));

    firstValueFrom(this.orderService.getAll())
      .then((res) => {
        this.totalOrders = res.length;
        this.shippingOrder = res.filter((o) => o.status == SHIPPING).length;
        this.paidOrder = res.filter((o) => o.status == PAID).length;
        this.canceledOrder = res.filter((o) => o.status == CANCELED).length;
      })
      .catch((err) => console.log(err));
  }

  // Variables
  totalProducts!: number;
  productsActive!: number;
  productSold!: number;
  allCategories!: number;
  totalOrders!: number;
  shippingOrder!: number;
  paidOrder!: number;
  canceledOrder!: number;
}
