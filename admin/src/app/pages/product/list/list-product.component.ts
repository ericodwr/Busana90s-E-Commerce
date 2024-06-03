import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { CategoryResDto } from 'src/app/dto/category/category.res.dto';
import { ProductResDto } from 'src/app/dto/product/productResDto';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

import { BASE_URL, BASE_URL_IMG } from 'src/app/constant/api.constant';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'list-product',
  templateUrl: 'list-product.component.html',
  styleUrls: ['./list-product.styles.css'],
  providers: [ConfirmationService],
})
export class ListProductComponent implements OnInit {
  categories: CategoryResDto[] = [];
  products: ProductResDto[] = [];
  url = BASE_URL_IMG;
  productId: string = '';
  visible = false;
  exportExcel = `${BASE_URL}/export/products`;
  loadingExport: boolean = false;
  constructor(
    private title: Title,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    title.setTitle('List Product');
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    firstValueFrom(this.productService.getAllProduct())
      .then((res) => {
        this.products = res;
      })
      .catch((err) => console.log(err));
  }

  getExcelData() {
    this.loadingExport = true;
    firstValueFrom(this.productService.getExcelData())
      .then((res) => {
        this.loadingExport = false;
      })
      .catch((err) => console.log(err));
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
    return '';
  }

  onDeleteModal(id: string) {
    if (id) {
      this.productId = id;
      this.visible = true;
    }
  }

  deleteProduct() {
    if (this.productId) {
      firstValueFrom(this.productService.deleteProduct(this.productId))
        .then((res) => {
          this.visible = false;
          this.productId = '';
          this.getData();
        })
        .catch((err) => console.log(err));
    }
  }
}
