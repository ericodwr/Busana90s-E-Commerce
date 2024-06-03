import { Injectable, OnInit } from '@angular/core';
import { BaseService } from './base.service';
import { BASE_URL } from '../constant/api.constant';
import { Observable } from 'rxjs';
import { ProductResDto } from '../dto/product/productResDto';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  constructor(private base: BaseService) {}

  ngOnInit(): void {}

  createProduct(body: any) {
    return this.base.post(`${BASE_URL}/product`, body);
  }

  deleteProduct(id: string) {
    return this.base.delete(`${BASE_URL}/product/?id=${id}`);
  }

  getAllProduct(): Observable<ProductResDto[]> {
    return this.base.get(`${BASE_URL}/product-admin`);
  }
  updateProduct(body: any) {
    return this.base.patch(`${BASE_URL}/product-admin`, body);
  }

  getById(id: string | null): Observable<ProductResDto> {
    return this.base.get(`${BASE_URL}/product-admin/detail/?id=${id}`);
  }

  getExcelData() {
    return this.base.get(`${BASE_URL}/export/products`);
  }
}
