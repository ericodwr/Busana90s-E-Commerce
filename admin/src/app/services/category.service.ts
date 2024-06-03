import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { CategoryResDto } from '../dto/category/category.res.dto';
import { BASE_URL } from '../constant/api.constant';
import { CategoryReqDto } from '../dto/category/categoryReqDto';
import { InsertResDto } from '../dto/InsertResDto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private base: BaseService) {}

  create(body: CategoryReqDto): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/category`, body);
  }

  getAll(): Observable<CategoryResDto[]> {
    return this.base.get(`${BASE_URL}/category`);
  }
}
