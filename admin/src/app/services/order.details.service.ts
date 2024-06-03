import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BASE_URL } from '../constant/api.constant';
import { Observable } from 'rxjs';
import { OrderDetailResDto } from '../dto/order/OrderDetailResDto';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  constructor(private base: BaseService) {}

  getByOrderId(orderId: string): Observable<OrderDetailResDto[]> {
    return this.base.get(`${BASE_URL}/order-details/?orderId=${orderId}`);
  }
}
