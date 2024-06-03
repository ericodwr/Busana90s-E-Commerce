import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BASE_URL } from '../constant/api.constant';
import { Observable } from 'rxjs';
import { OrderResDto } from '../dto/order/OrderResDto';
import { InsertResDto } from '../dto/InsertResDto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private base: BaseService) {}

  getAll(): Observable<OrderResDto[]> {
    return this.base.get(`${BASE_URL}/order`);
  }

  updateReceiptNumber(data: any): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/order/receipt_number`, data);
  }
}
