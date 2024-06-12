import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { BASE_URL } from 'src/app/constant/api.constant';
import { CustomerResDto } from 'src/app/dto/customer/CustomerResDto';
import { LoginResDto } from 'src/app/dto/login/login.res.dto';
import { OrderDetailResDto } from 'src/app/dto/order/OrderDetailResDto';
import { OrderResDto } from 'src/app/dto/order/OrderResDto';
import { ShipmentResDto } from 'src/app/dto/shipment/ShipmentResDto';
import { AuthService } from 'src/app/services/auth.service';
import { OrderDetailsService } from 'src/app/services/order.details.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'list-order',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private orderDetailsService: OrderDetailsService,
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {}

  exportExcel = `${BASE_URL}/export/orders`;

  profile!: LoginResDto | null;
  orders: OrderResDto[] = [];
  customerVisible: boolean = false;
  shipmentVisible: boolean = false;
  orderDetailVisible: boolean = false;
  updateVisible: boolean = false;
  updateLoading: boolean = false;
  customerData: CustomerResDto | undefined;
  shipmentData: ShipmentResDto | undefined;
  orderDetailData: OrderDetailResDto[] = [];

  updateForm = this.fb.group({
    id: ['', Validators.required],
    receipt_number: ['', Validators.required],
  });

  getData() {
    this.profile = this.authService.getProfile();
    firstValueFrom(this.orderService.getAll())
      .then((res) => {
        this.orders = res;
        console.log(res);

        for (const order of this.orders) {
          firstValueFrom(this.orderDetailsService.getByOrderId(order.id))
            .then((res) => {
              order.order_details = res;
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  ngOnInit(): void {
    this.getData();
  }

  // is Admin
  get isAdmin() {
    return this.profile?.username === 'admin';
  }

  getSeverity(status: string) {
    switch (status) {
      case 'true':
        return 'success';
      case 'false':
        return 'danger';
    }
    return '';
  }

  onCustomerModal(data: CustomerResDto) {
    this.customerVisible = true;
    this.customerData = data;
  }

  onShipmentModal(data: ShipmentResDto) {
    this.shipmentVisible = true;
    this.shipmentData = data;
  }

  onOrderDetailModal(data: OrderDetailResDto[]) {
    this.orderDetailVisible = true;
    this.orderDetailData = data;
  }
  onUpdateModal(id: string) {
    this.updateForm.get('id')?.setValue(id);
    this.updateVisible = true;
  }

  updateReceiptNumber() {
    if (this.updateForm.valid) {
      this.updateLoading = true;
      const data = this.updateForm.getRawValue();
      firstValueFrom(this.orderService.updateReceiptNumber(data))
        .then((res) => {
          this.updateForm.reset();
          this.updateLoading = false;
          this.getData();
          this.updateVisible = false;
        })
        .catch((err) => console.log(err));
    }
  }
}
