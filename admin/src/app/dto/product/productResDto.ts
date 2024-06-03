import { CategoryResDto } from '../category/category.res.dto';
import { ProductImgResDto } from './productImgResDto';

export interface ProductResDto {
  id: string;
  name: string;
  categories: CategoryResDto;
  description: string;
  size: string;
  status: string;
  price: number;
  categoryId: string;
  product_imgs: ProductImgResDto[];
}
