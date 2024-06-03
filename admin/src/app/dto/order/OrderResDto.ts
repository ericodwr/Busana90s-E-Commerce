import { CustomerResDto } from '../customer/CustomerResDto';
import { ShipmentResDto } from '../shipment/ShipmentResDto';
import { OrderDetailResDto } from './OrderDetailResDto';

export interface OrderResDto {
  id: string;
  status: string;
  total: number;
  snap_token: string;
  payment_method: string;
  snap_redirect_url: string;
  order_details: OrderDetailResDto[];
  shipmentId: string;
  customerId: string;
  customers: CustomerResDto;
  shipments: ShipmentResDto;
}
