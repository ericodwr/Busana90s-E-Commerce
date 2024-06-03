import { ProductResDto } from '../product/productResDto';

export interface OrderDetailResDto {
  id: string;
  productId: string;
  price: string;
  products: ProductResDto;
}
